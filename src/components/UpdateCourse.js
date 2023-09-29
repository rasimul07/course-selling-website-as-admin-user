import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseCard } from "./Courses";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";

import axios from "axios";
function Course() {
    let { courseId } = useParams();       //this is param hook
    const [courses, setCourses] = useState([]);
    const [editButton, setEditButton] = useState(false);
    // const [course,setCourse] = useState(null);
    // console.log(courses);
    useEffect(() => {
        // console.log("inupdate",courseId);
        try {
            async function fetchData() {
                const response = await axios.get('http://localhost:3000/admin/courses', {
                    headers: {
                        'authorization': "Barrier " + localStorage.getItem('token')
                    }
                })
                const data = response.data.courses;
                setCourses(data)
            }
            fetchData();
        } catch (err) {
            console.log(err);
        }

    }, [])

    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id === courseId) {
            course = courses[i];
            break;
        }
    }

    //param don't match with course Id
    if (!course) {
        return (
            <div>
                {JSON.stringify(course)}
            </div>
        )
    }

    return (
        <div>
            <GrayTopper></GrayTopper>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <CourseCard course={course} editButton={editButton} setEditButton={setEditButton}></CourseCard>
                </Grid>
                <Grid item  xs={12} md={6}>
                    <UpdataCard course={course} courses={courses} setCourses={setCourses} courseId={courseId}></UpdataCard>
                </Grid>
            </Grid>
        </div>
    )
}

function UpdataCard(props) {
    const course = props.course;
    const courses = props.courses;
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [imageLink, setImageLink] = useState(course.imageLink);
    const [message, setMessage] = useState("");
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <Paper 
            elevation={3} 
            component={'form'} 
            sx={{ p: 2, width: 400, m: 4, position:{
                md:'absolute',
                top:'180px',
                left:'30px'
            }
            }}>
                <TextField
                    variant="outlined"
                    label='title'
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    value={title}
                    placeholder={""}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    label='description'
                    multiline
                    maxRows={3}
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    placeholder={""}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    label='ImageLInk'
                    maxRows={3}
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    value={imageLink}
                    placeholder={""}
                    onChange={(e) => {
                        setImageLink(e.target.value);
                    }}
                ></TextField>

                <TextField
                    variant="outlined"
                    type="number"
                    label='price'
                    size="small"
                    sx={{ mb: 2 }}
                    value={price}
                    placeholder={""}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                ></TextField>

                <Typography variant='caption' style={{ color: 'red' }}>{message}</Typography>
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => {
                        ///eficient way using state variable in react
                        // console.log("props.course._id",props.course._id);
                        fetch(`http://localhost:3000/admin/courses/${props.course._id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                title,
                                description,
                                price,
                                imageLink
                            }),
                            headers: {
                                'Content-type': 'application/json',
                                'authorization': "Barrier " + localStorage.getItem('token')
                            }
                        }
                        ).then(response => {
                            return response.json();
                        }).then(data => {
                            const token = data["token"];
                            setMessage(data["message"])

                            //for live reflect of course update
                            const updatedCourses = [];
                            for (let i = 0; i < courses.length; i++) {
                                if (courses[i]._id == props.course._id) {
                                    // console.log(courses[i]._id);
                                    // console.log(props.course._id);
                                    updatedCourses.push({
                                        // id: courses[i].id,
                                        title,
                                        description,
                                        price,
                                        imageLink,
                                    });
                                } else {
                                    updatedCourses.push(courses[i]);
                                }
                            }

                            // props.setCourses(updatedCourses);
                            // if (token) {
                            //     localStorage.setItem("token", data["token"])
                            // }
                            alert('course updated successfully.')
                            // document.location = '/course/65119e95b95c7dedeac97c36'
                            props.setCourses({ title, description, price, imageLink })
                        }).catch((err) => {
                            console.log(err)
                        })   // to store in local storage in browser
                    }}
                >Update Course</Button>
            </Paper>
        </div>
    )
}

function GrayTopper() {
    return (
        <div style={{
            width: '100vw', height: '200px', background: '#181716',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Typography variant="h3" color={'white'}>Full Stack Course</Typography>
        </div>
    )
}

export default Course;