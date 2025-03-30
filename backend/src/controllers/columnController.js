import Column from "../models/Column";

const getColumns = async (req, res) => {
  try {
    const columns = await Column.findOne({ userId: req.user.id });
    res.json(columns || { columns: [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch columns" });
  }
};

const addColumn = async (req, res) => {
  try {
    const { name, type } = req.body;
    let columnData = await Column.findOne({ userId: req.user.id });

    if (!columnData) {
      columnData = new Column({ userId: req.user.id, columns: [] });
    }

    columnData.columns.push({ name, type });
    await columnData.save();

    res.json({ message: "Column added", columns: columnData.columns });
  } catch (error) {
    res.status(500).json({ error: "Failed to add column" });
  }
};

module.exports = { getColumns, addColumn };
