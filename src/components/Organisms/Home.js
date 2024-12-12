import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faCalendarAlt, faUsers, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO, isValid } from 'date-fns';
import moment from 'moment';
import {
    Container,
    Sidebar,
    Hamburger,
    Bar,
    NavItem,
    MainContent,
    TopBar,
    SummaryBoxes,
    SummaryBox,
    AddCampaignButton,
    AddCampaignForm,
    FilterForm,
    CampaignTable,
    Pagination,
    Footer,
    ErrorMessage,
    DropdownMenu
} from './StyledComponents'; // Adjust the import based on your file structure

const Home = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [dateTime, setDateTime] = useState(format(new Date(), 'dd-MM-yyyy HH:mm:ss'));
    const [campaigns, setCampaigns] = useState([]);
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        start: new Date(),
        end: new Date(),
        type: "",
        status: "Draft"
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchText, setSearchText] = useState(""); // New state for search text
    const [currentPage, setCurrentPage] = useState(1);
    const [formVisible, setFormVisible] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const itemsPerPage = 5;

    const location = useLocation();

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(format(new Date(), 'dd-MM-yyyy HH:mm:ss'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(savedCampaigns.map(campaign => ({
            ...campaign,
            start: campaign.start ? parseISO(campaign.start) : new Date(),
            end: campaign.end ? parseISO(campaign.end) : new Date()
        })));
    }, []);

    useEffect(() => {
        localStorage.setItem('campaigns', JSON.stringify(campaigns.map(campaign => ({
            ...campaign,
            start: campaign.start instanceof Date && isValid(campaign.start) ? campaign.start.toISOString() : null,
            end: campaign.end instanceof Date && isValid(campaign.end) ? campaign.end.toISOString() : null
        }))));
    }, [campaigns]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCampaign(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date, field) => {
        if (field === 'end' && date && date < newCampaign.start) {
            setError("End date cannot be before start date.");
            return;
        }
        setError("");
        setNewCampaign(prev => ({ ...prev, [field]: date }));
    };

    const validateDates = () => {
        const now = moment();
        const start = moment(newCampaign.start);
        const end = moment(newCampaign.end);

        if (newCampaign.status === 'Running') {
            if (start.isBefore(now, 'day') || end.isBefore(now, 'day')) {
                return "Invalid date range for status 'Running'. Dates should be in the future.";
            }
        } else if (newCampaign.status === 'Complete') {
            if (end.isAfter(now, 'day')) {
                return "Invalid date range for status 'Complete'. End date should not be in the future.";
            }
        }

        return "";
    };

    const addCampaign = () => {
        const errorMsg = validateDates();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setCampaigns(prev => [
            ...prev,
            {
                ...newCampaign,
                start: newCampaign.start instanceof Date && isValid(newCampaign.start) ? newCampaign.start.toISOString() : null,
                end: newCampaign.end instanceof Date && isValid(newCampaign.end) ? newCampaign.end.toISOString() : null
            }
        ]);
        setNewCampaign({ name: "", start: new Date(), end: new Date(), type: "", status: "Draft" });
        setFormVisible(false);
        setError("");
    };

    const saveCampaign = () => {
        const errorMsg = validateDates();
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setCampaigns(prev =>
            prev.map((campaign, index) =>
                index === editingIndex
                    ? {
                        ...newCampaign,
                        start: newCampaign.start instanceof Date && isValid(newCampaign.start) ? newCampaign.start.toISOString() : null,
                        end: newCampaign.end instanceof Date && isValid(newCampaign.end) ? newCampaign.end.toISOString() : null
                    }
                    : campaign
            )
        );
        setEditingIndex(null);
        setNewCampaign({ name: "", start: new Date(), end: new Date(), type: "", status: "Draft" });
        setFormVisible(false);
        setError("");
    };

    const deleteCampaign = (index) => {
        if (window.confirm("Do you wish to delete this record?")) {
            setCampaigns(prev => prev.filter((_, i) => i !== index));
        }
    };

    const editCampaign = (index) => {
        setEditingIndex(index);
        setNewCampaign({
            ...campaigns[index],
            start: parseISO(campaigns[index].start),
            end: parseISO(campaigns[index].end)
        });
        setFormVisible(true);
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
        if (formVisible && editingIndex !== null) {
            setEditingIndex(null);
            setNewCampaign({ name: "", start: new Date(), end: new Date(), type: "", status: "Draft" });
        }
    };

    const handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        setDateRange([start, end]);
    };

    const filteredCampaigns = campaigns.filter(campaign => {
        const campaignStart = moment(campaign.start);
        const campaignEnd = moment(campaign.end);
        const startRange = dateRange[0] ? moment(dateRange[0]).startOf('day') : null;
        const endRange = dateRange[1] ? moment(dateRange[1]).endOf('day') : null;

        const isInDateRange = (!startRange || campaignStart.isSameOrAfter(startRange)) &&
                              (!endRange || campaignEnd.isSameOrBefore(endRange));

        const matchesSearchText = campaign.name.toLowerCase().includes(searchText.toLowerCase());

        return (filter === "All" || campaign.status === filter) && isInDateRange && matchesSearchText;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCampaigns = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

    const totalCount = campaigns.length;
    const draftCount = campaigns.filter(c => c.status === 'Draft').length;
    const runningCount = campaigns.filter(c => c.status === 'Running').length;
    const completedCount = campaigns.filter(c => c.status === 'Complete').length;

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedCampaigns = React.useMemo(() => {
        const sortableItems = [...filteredCampaigns];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredCampaigns, sortConfig]);

    return (
        <Container>
            <Sidebar isCollapsed={isCollapsed}>
                <Hamburger onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburger>

                {/* Navigation Icons */}
                <NavItem className={isActive('/home')}>
                    <Link to="/home">
                        <FontAwesomeIcon icon={faHome} />
                        <div className="nav-label">Home</div>
                    </Link>
                </NavItem>
                <NavItem className={isActive('/dashboard')}>
                    <Link to="/dashboard">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        <div className="nav-label">Dashboard</div>
                    </Link>
                </NavItem>
                <NavItem className={isActive('/campaigns')}>
                    <Link to="/campaigns">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <div className="nav-label">Campaigns</div>
                    </Link>
                </NavItem>
                <NavItem className={isActive('/users')}>
                    <Link to="/users">
                        <FontAwesomeIcon icon={faUsers} />
                        <div className="nav-label">Users</div>
                    </Link>
                </NavItem>
                <NavItem className={isActive('/settings')}>
                    <Link to="/settings">
                        <FontAwesomeIcon icon={faCog} />
                        <div className="nav-label">Settings</div>
                    </Link>
                </NavItem>
            </Sidebar>

            <MainContent>
                {/* Top Bar */}
                <TopBar>
                    <div className="date-time">
                        <p>{dateTime}</p>
                    </div>
                    <div className="profile" onClick={toggleDropdown}>
                        <div className="profile-icon">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        {dropdownOpen && (
                            <DropdownMenu>
                                <ul>
                                    <li>Profile</li>
                                    <li>Settings</li>
                                    <li>Logout</li>
                                </ul>
                            </DropdownMenu>
                        )}
                    </div>
                </TopBar>

                {/* Summary Boxes */}
                <SummaryBoxes>
                    <SummaryBox className="total">
                        <h4>Total</h4>
                        <p>{totalCount} {totalCount === 1 ? 'Campaign' : 'Campaigns'}</p>
                    </SummaryBox>
                    <SummaryBox className="running">
                        <h4>Running</h4>
                        <p>{runningCount} {runningCount === 1 ? 'Campaign' : 'Campaigns'}</p>
                    </SummaryBox>
                    <SummaryBox className="completed">
                        <h4>Completed</h4>
                        <p>{completedCount} {completedCount === 1 ? 'Campaign' : 'Campaigns'}</p>
                    </SummaryBox>
                    <SummaryBox className="draft">
                        <h4>Draft</h4>
                        <p>{draftCount} {draftCount === 1 ? 'Campaign' : 'Campaigns'}</p>
                    </SummaryBox>
                </SummaryBoxes>

                {/* Add Campaign Button */}
                <AddCampaignButton onClick={toggleFormVisibility}>
                    {formVisible ? "Hide Form" : "Add Campaign"}
                    <span className={`arrow ${formVisible ? "up" : "down"}`}>▲</span>
                </AddCampaignButton>

                {/* Add Campaign Form */}
                {formVisible && (
                    <AddCampaignForm>
                        <input
                            type="text"
                            name="name"
                            value={newCampaign.name}
                            onChange={handleInputChange}
                            placeholder="Campaign Name"
                        />
                        <DatePicker
                            selected={newCampaign.start}
                            onChange={(date) => handleDateChange(date, 'start')}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Start Date"
                        />
                        <DatePicker
                            selected={newCampaign.end}
                            onChange={(date) => handleDateChange(date, 'end')}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="End Date"
                        />
                        <input
                            type="text"
                            name="type"
                            value={newCampaign.type}
                            onChange={handleInputChange}
                            placeholder="Type"
                        />
                        <select
                            name="status"
                            value={newCampaign.status}
                            onChange={handleInputChange}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Running">Running</option>
                            <option value="Complete">Complete</option>
                        </select>
                        {editingIndex === null ? (
                            <button className="add-campaign-button" onClick={addCampaign}>Add Campaign</button>
                        ) : (
                            <button className="add-campaign-button" onClick={saveCampaign}>Save Campaign</button>
                        )}
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </AddCampaignForm>
                )}

                {/* Date Range Filter */}
                <FilterForm>
                    <label>Filter by status:</label>
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="All">All</option>
                        <option value="Draft">Draft</option>
                        <option value="Running">Running</option>
                        <option value="Complete">Complete</option>
                    </select>
                    <label>Date Range:</label>
                    <DatePicker
                        selected={dateRange[0]}
                        onChange={handleDateRangeChange}
                        selectsRange
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select date range"
                    />
                    {/* Search Input */}
                    <label>Search:</label>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search by name"
                    />
                </FilterForm>

                {/* Campaign Table */}
                <CampaignTable>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                            <th onClick={() => handleSort('start')}>Start Date {sortConfig.key === 'start' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                            <th onClick={() => handleSort('end')}>End Date {sortConfig.key === 'end' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                            <th onClick={() => handleSort('type')}>Type {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                            <th onClick={() => handleSort('status')}>Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCampaigns.slice(indexOfFirstItem, indexOfLastItem).map((campaign, index) => (
                            <tr key={index}>
                                <td>{campaign.name}</td>
                                <td>{campaign.start ? format(new Date(campaign.start), 'dd/MM/yyyy') : '-'}</td>
                                <td>{campaign.end ? format(new Date(campaign.end), 'dd/MM/yyyy') : '-'}</td>
                                <td>{campaign.type}</td>
                                <td>{campaign.status}</td>
                                <td>
                                    <button className="action-btn" onClick={() => editCampaign(index)}>Edit</button>
                                    <button className="delete-btn action-btn" onClick={() => deleteCampaign(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </CampaignTable>

                {/* Pagination */}
                <Pagination>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                </Pagination>

                {/* Footer */}
                <Footer>
                    <p>Copyright © 2006-2024 Graymatter Software Services Pvt. Ltd. All rights reserved.</p>
                </Footer>
            </MainContent>
        </Container>
    );
};

export default Home;
