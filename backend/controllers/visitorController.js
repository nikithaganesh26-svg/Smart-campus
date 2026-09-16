const visitors = [];

const addVisitor = (req, res) => {
    const visitor = req.body;

    visitors.push(visitor);

    res.status(201).json({
        message: "Visitor added successfully",
        visitor: visitor
    });
};

const getVisitors = (req, res) => {
    res.json(visitors);
};

module.exports = {
    addVisitor,
    getVisitors
};