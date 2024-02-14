import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import BlurOnIcon from '@mui/icons-material/BlurOn';
const listData = [
    {
        path: '/dashboard',
        label: "Dashboard",
        icon: <DashboardCustomizeIcon/>,
        role: ['admin']
    },
    {
        path: '/memberlist',
        label: "Members",
        icon: <AccountBoxIcon/>,
        role: ['admin']
    },
    {
        path: '/amenities',
        label: "Amenities",
        icon: <BlurOnIcon/>,
        role: ['admin']
    },
    {
        path: '/invoice',
        label: "Invoice",
        icon: <ReceiptIcon/>,
        role: ['admin']
    },
    {
        path: '/user',
        label: "User/Staff",
        icon: <PeopleAltIcon/>,
        role: ['admin']
    },
    {
        path: '/roles',
        label: "Roles",
        icon: <GroupWorkIcon/>,
        role: ['admin']
    },
    {
        path: '/subscription',
        label: "Subscription",
        icon: <SubscriptionsIcon/>,
        role: ['admin']
    },
    {
        path: '/dashboard',
        label: "Dashboard",
        icon: <DashboardCustomizeIcon/>,
        role: ['user']
    },
    {
        path: '/memberlist',
        label: "Member",
        icon: <AccountBoxIcon/>,
        role: ['user']
    }
]

export default listData