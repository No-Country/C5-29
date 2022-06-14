import { useFormik } from 'formik'
import * as yup from 'yup'
import {
    TextField,
    Button,
    Grid,
    CircularProgress,
    IconButton,
    Paper,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import handleUploadPictures from '../../utils/handleUploadPictures'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/system'
import Typography from '@mui/material/node/Typography'

import Swal from 'sweetalert2'
import { createPetAdoption } from '../../redux/asyncActions/pet/createPetAdoption'

const preset = import.meta.env.VITE_APP_PRESET_ADOPT_PETS

const races = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
]
const genres = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
]

const validationSchema = yup.object({
    nickname: yup.string().required('Pet name is required'),
    age: yup
        .number()
        .typeError('you must specify a number')
        .min(1, 'Min value 1.'),
    city: yup.string().required('City name is required'),
    // race: yup.string().required('Race is required'),
    // genre: yup.string(),
    color: yup.string().max(100, 'Max 100 chars'),
    description: yup
        .string()
        .min(15, 'Min 50 characters')
        .max(200, 'Max 900 characters')
        .required('Description is required'),
})

const PetCreationForm = () => {
    const [race, setRace] = useState('')
    const [genre, setGenre] = useState('')

    const handleRaceChange = (event) => {
        setRace(event.target.value)
    }
    const handleGenreChange = (event) => {
        setGenre(event.target.value)
    }

    const [checked, setChecked] = useState(false)

    const handleVaccinateChange = (event) => {
        setChecked(event.target.checked)
    }
    const { userInfo } = useSelector((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])
    const dispatch = useDispatch()

    const handleDeleteImg = (elem) => {
        setImage((prevState) => prevState.filter((img) => img !== elem))
    }

    const onSubmit = (values) => {
        values.image = image
        values.genre = genre
        values.race = race
        values.vaccinated = checked
        values.shelter = userInfo.shelter
        console.log(values)
        dispatch(createPetAdoption(values))
        setImage([])
        // formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            nickname: '',
            age: '',
            city: '',
            description: '',
            color: '',
        },
        // validationSchema,

        onSubmit,
    })

    return (
        <>
        <Grid item xs={0.2}></Grid>
        <Grid item xs={8}>
            <Grid container>
                <Grid
                    item
                    component={'form'}
                    onSubmit={formik.handleSubmit}
                    xs={12}
                    md={6}
                    lg={6}
                    margin="auto"
                    style={{
                        border: 'solid 1px lightgrey',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '30px',
                        
                    }}
                >
                    <Box textAlign={'center'} marginTop={2} marginBottom={5}>
                        <Typography variant="h5">
                            Pet in Adoption Post
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="nickname"
                                name="nickname"
                                label="Pet name"
                                value={formik.values.nickname}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.nickname &&
                                    Boolean(formik.errors.nickname)
                                }
                                helperText={
                                    formik.touched.nickname &&
                                    formik.errors.nickname
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="age"
                                name="age"
                                label="Age"
                                type="number"
                                min="1"
                                step="1"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.age &&
                                    Boolean(formik.errors.age)
                                }
                                helperText={
                                    formik.touched.age && formik.errors.age
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="city"
                                name="city"
                                label="City"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.city &&
                                    Boolean(formik.errors.city)
                                }
                                helperText={
                                    formik.touched.city && formik.errors.city
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="race"
                                name="race"
                                select
                                fullWidth
                                label="Race"
                                value={race}
                                onChange={handleRaceChange}
                                helperText="Please select the race"
                                style={{ marginBottom: '20px' }}
                            >
                                {races.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="genre"
                                name="genre"
                                select
                                fullWidth
                                label="Genre"
                                value={genre}
                                onChange={handleGenreChange}
                                helperText="Please select the gender"
                                style={{ marginBottom: '20px' }}
                            >
                                {genres.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="color"
                                name="color"
                                label="Color"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.color &&
                                    Boolean(formik.errors.color)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.color
                                }
                                style={{ marginBottom: '20px' }}
                            />
                        </Grid>
                    </Grid>

                    <Box style={{ marginBottom: '1rem' }}>
                        {image.length ? (
                            <Paper
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    p: 3,
                                }}
                                variant="outlined"
                            >
                                {image?.map((elem, idx) => (
                                    <div key={idx}>
                                        <IconButton
                                            style={{
                                                position: 'absolute',
                                                margin: 1,
                                                borderRadius: 10,
                                            }}
                                            onClick={() =>
                                                handleDeleteImg(elem)
                                            }
                                        >
                                            <HighlightOffTwoToneIcon color="primary" />
                                        </IconButton>
                                        <img
                                            src={elem}
                                            alt="Not found"
                                            style={{
                                                width: '7rem',
                                                height: '7rem',
                                                borderRadius: 4,
                                            }}
                                        />
                                    </div>
                                ))}
                            </Paper>
                        ) : null}
                        {loading && <CircularProgress />}
                        <TextField
                            required
                            fullWidth
                            type="file"
                            id="img"
                            name="img"
                            helperText="Upload Pet images"
                            onChange={(e) =>
                                handleUploadPictures(
                                    e,
                                    setLoading,
                                    setImage,
                                    preset
                                )
                            }
                        />
                    </Box>
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Describe the pet"
                        multiline
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        style={{ marginBottom: '20px' }}
                    />
                    <Box textAlign={'center'} marginTop={2} marginBottom={5}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="vaccinated"
                                    name="vaccinated"
                                    color="secondary"
                                    size="medium"
                                    checked={checked}
                                    onChange={handleVaccinateChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Vaccinated"
                        />
                    </Box>

                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
            </Grid>
            
        </>
    )
}

export default PetCreationForm
