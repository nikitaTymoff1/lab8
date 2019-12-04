const express = require('express');
const cors = require('cors');
const port = 4000;
const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('sql7314449', 'sql7314449', 'Xfxa5eGiQu', {
    host: 'sql7.freemysqlhosting.net',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

const Model = Sequelize.Model;

class Abonenty extends Model {
}

Abonenty.init({
    id_abonenta: {
        primaryKey:true,
        type: Sequelize.INTEGER,
    },
    iNPP: {
        type: Sequelize.STRING,

    },
    phone_number: {
        type: Sequelize.STRING,

    },
    adressa: {
        type: Sequelize.STRING,
    },
}, {
    sequelize,
    modelName: 'abonenty'
});

const app = express();

const findAll = (res) => {
    Abonenty.findAll().then(misto => {
        res.send(JSON.stringify(misto, null, 4))
    });
};

app.use(cors());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.send('hello');
});
app.get('/add', (req, res) => {
    Abonenty.create({
        iNPP: req.query.iNPP,
        phone_number: req.query.n,
        adressa: req.query.adressa,
    }).then(task => {
        console.log("auto-generated ID:", task.id);
        findAll(res);
    })
});
app.get('/abonenty', (req, res) => {
    Abonenty.findAll().then(task => {
        console.log("abonenty:", JSON.stringify(task, null, 4));
        res.send(JSON.stringify(task, null, 4))
    });

});
app.get('/update', (req, res) => {
    Abonenty.update({phone_number: req.query.n}, {
        where: {
            id_abonenta: req.query.id
        }
    }).then(() => {
        console.log("Done");
        findAll(res)
    });
});
app.get('/delete', (req, res) => {
    Abonenty.destroy({
        where: {
            id_abonenta: req.query.id
        }
    }).then(() => {
        console.log("Done");
        findAll(res)
    });
});

app.listen(port, () => {
    console.log(`listening to ${port}`)
});