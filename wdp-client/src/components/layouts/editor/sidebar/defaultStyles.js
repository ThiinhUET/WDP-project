export default {
    searchBox: {
        position: 'fixed',
    },
    addFileBox: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '35px',
        height: '25px',
        width: '200px',
        backgroundColor: 'rgb(60,60,60)',
        input: {
            margin: '0 5px',
            backgroundColor: 'transparent',
            color: '#aeafad',
            border: '1px solid gray',
            outline: 'none',
            padding: '0px 5px',
            width: '112px',
        },
        icon_holder: {
            display: 'flex',
            padding: '0 5px',
            color: '#aeafad',
            cursor: 'pointer',
        },
        icon: {
            height: '12px',
            width: '12px',
        },
    },
    component: {
        position: 'relative',
        top: '60px',
        height: 'calc(100% - 120px)',
        padding: '5px',
        width: 'max-content',
        minWidth: '190px',
        display: 'inline-block',
        overflow: 'auto',
        
    },
    viewer: {
        base: {
            padding: '20px',
            color: '#9DA5AB',
            minHeight: '0px'
        }
    },
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0,
            color: '#aeafad',
            fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif',
            fontSize: '11pt',
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {},
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#aeafad',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#aeafad'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '10px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
