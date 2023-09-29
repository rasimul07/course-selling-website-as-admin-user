import { useEffect, useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Courses() {
    const [courses, setCourses] = useState([]);
    const [editButton, setEditButton] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: 'GET',
            headers: {
                'authorization': "Barrier " + localStorage.getItem('token')
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setCourses(data['courses'])
        })
    }, [])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {courses.map((course) => {
                return <CourseCard course={course} editButton={editButton} setEditButton={setEditButton} />
            })}
        </div>
    )
}

function CourseCard(props) {
    const navigate = useNavigate();
    if (props.editButton) {
        return (
            <Card style={{ margin: '10px', padding: 5, display: 'inline-block' }}>
                <Typography variant='h5' textAlign={'center'}>{props.course.title}</Typography>
                <Typography textAlign={'center'}>{props.course.description}</Typography>
                <img src={props.course.imageLink} alt="loading"></img>
                <Typography>price:{props.course.price}</Typography>
                <Typography>courseId:{props.course._id}</Typography>
                <div>
                    <Button variant='contained' size='large' onClick={
                        () => {
                            navigate('/course/' + props.course._id);
                            console.log("incourses:", props.course._id);
                            // window.location = '/course/'+props.course._id;
                            props.setEditButton(false);
                        }
                    }>
                        Edit
                    </Button>
                </div>
            </Card>
        )

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card style={{
                margin: '10px',
                padding: 5,
                display: 'inline-block',
                zIndex: 1,
            }}
                sx={{
                    position: {
                        md: 'absolute',
                        top: '100px',
                        right: '30px'
                    }
                }}
            >
                <img src={props.course.imageLink} alt="loading" style={{ width: '100%', borderRadius: "10px 10px 2px 2px" }}></img>
                <Typography variant='h5' textAlign={'center'}>{props.course.title}</Typography>
                <Typography textAlign={'center'}>{props.course.description}</Typography>
                <Typography>price:{props.course.price}</Typography>
                <Typography>courseId:{props.course._id}</Typography>
            </Card>
        </div>
    )
}
export { Courses, CourseCard };

