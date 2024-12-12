import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f4f4f4; /* Light gray background */
`;

export const Sidebar = styled.div`
    width: ${({ isCollapsed }) => (isCollapsed ? '60px' : '250px')};
    background-color: #dcdcdc; 
    color: white;
    padding: 20px;
    transition: width 0.3s;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

export const Hamburger = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const Bar = styled.div`
    width: 30px;
    height: 4px;
    background-color: white;
    margin: 3px 0;
    transition: background-color 0.3s;
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 0;
    transition: all 0.3s;
    justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'flex-start')};
    border-radius: 10px;
    padding: 10px;

    .nav-icon {
        margin-right: ${({ isCollapsed }) => (isCollapsed ? '0' : '10px')};
        display: flex;
    }

    .nav-text {
        display: ${({ isCollapsed }) => (isCollapsed ? 'none' : 'block')};
        color: #fff;
    }

    &:hover {
        background-color: #34495e; /* Slightly lighter on hover */
    }
`;

export const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #ffffff; /* Clean white background */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

export const SummaryBoxes = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    flex-wrap: nowrap;
`;

export const SummaryBox = styled.div`
    flex: 1;
    max-width: 220px;
    background-color: ${(props) => props.color || '#ecf0f1'}; /* Light gray default */
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;

export const AddCampaignButton = styled.button`
    background-color: #2980b9; /* Soft blue */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #3498db; /* Lighter blue on hover */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
`;

export const AddCampaignForm = styled.div`
    background-color: #ffffff;
    padding: 20px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const FilterForm = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        margin-right: 10px;
        font-weight: bold;
        color: #2c3e50; /* Dark navy */
    }
`;

export const CampaignTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;

    th, td {
        padding: 15px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #ecf0f1; /* Light gray for headers */
        font-weight: bold;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;

    .page-btn {
        margin: 0 5px;
        padding: 5px 15px;
        cursor: pointer;
        border-radius: 10px;
        background-color: #2980b9; /* Soft blue */

        &.active {
            background-color: #3498db; /* Active color */
            color: white;
        }

        &:hover {
            background-color: #1abc9c; /* Teal on hover */
        }
    }
`;

export const Footer = styled.footer`
    text-align: center;
    padding: 20px;
    background-color: #333; /* Dark for contrast */
    color: white;
    position: relative;
`;

export const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    background-color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    ul {
        list-style: none;
        padding: 10px;
        margin: 0;
    }

    li {
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: #ecf0f1; /* Light hover effect */
        }
    }
`;
