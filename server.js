const express = require('express');
const studentRoutes = require('./src/student/routes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.use('/api/v1/students', studentRoutes);

app.listen(PORT, () => {
    console.log(`app listening to port ${PORT} . . . `);
}) 