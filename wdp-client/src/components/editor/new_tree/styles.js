export default {
    component: {
        width: '100%',
        display: 'inline-block',
        '@media (max-width: 640px)': {
            width: '100%'
        },
        overflow: 'auto',
        border: 'solid red',
    },
    searchBox: {
        padding: '20px 20px 0 20px'
    },
    viewer: {
        base: {
            fontSize: '15px',
            whiteSpace: 'pre-wrap',
            backgroundColor: '#282C34',
            border: 'solid 1px blue',
            padding: '20px',
            color: '#9DA5AB',
            minHeight: '250px'
        }
    }
};
