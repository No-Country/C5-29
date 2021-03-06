import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Divider } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'

import logo from '../../assets/logo.png'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'

import '../../App.css'
import { getAllShelters } from '../../redux/asyncActions/shelter/getAllShelters'
import Loading from '../Loading/Loading'
import UserMenu from '../NavBar/UserMenu'
import { postLogout } from '../../redux/asyncActions/user/postLogout'

import { getUserInfo } from '../../redux/asyncActions/user/getUserInfo'

const NavBar = () => {
    const { userInfo, isLogged, isAdmin } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)

    const { shelters, status } = useSelector((state) => state.shelter)
    useEffect(() => {
        if (isLogged) {
            dispatch(getUserInfo())
        }
        if (status !== 'success') {
            dispatch(getAllShelters())
        }
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleShelters = (event) => {
        const sh = shelters.filter((el) => el.name === event.target.innerText)
        handleClose()
        navigate(`/shelter/${sh[0]._id}`)
    }

    const handleLogout = () => {
        dispatch(postLogout())
        navigate('/home')
    }

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white !important',
                boxShadow: 'none !important',
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    backgroundColor: 'white !important',
                    boxShadow: 'none !important',
                }}
            >
                <Toolbar disableGutters>
                   
                    <LinkRouter to={'/home'}>
                        <img src={logo} alt="logo" className="imageLogo" />
                    </LinkRouter>

                                        
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'flex' },
                        }}
                        marginX={5}
                    >
                        <Button
                            onClick={handleClick}
                            sx={{ my: 2, color: '#515151', display: 'block', size:{xs:'small', md:'medium'} }}
                            // aria-control={openMenu ? 'sheltersMenu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                            
                            
                        >
                            Shelters
                        </Button>
                        <Menu
                            id="sheltersMenu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleClose}
                        >
                            {status === 'success' ? (
                                shelters.map((el, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={handleShelters}
                                    >
                                        {el.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <Loading size={30} margin={'1px 30px'} />
                            )}
                        </Menu>

                        <Button
                            sx={{ my: 2, color: '#515151', display: 'block' }}
                        >
                            <LinkRouter
                                to={'/Adoptions'}
                                className="navButtons"
                            >
                                Adoptions
                            </LinkRouter>
                        </Button>
                    </Box>

                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                        }}
                    >
                        {isLogged && userInfo !== 'undefined' ? (
                            <UserMenu
                                img={userInfo?.img}
                                logout={handleLogout}
                                isAdmin={isAdmin}
                            ></UserMenu>
                        ) : (
                            <Button
                                variant="contained"
                                style={{
                                    width: '120px',
                                    padding: '5px 10px',
                                    backgroundColor: '#1565C0 !important',
                                    boxShadow:
                                        '2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12) !important',
                                    borderRadius: '4px !important',
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <Divider></Divider>
        </AppBar>
    )
}

export default NavBar
