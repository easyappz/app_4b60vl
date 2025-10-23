const CATEGORIES = [
  { key: 'nedvizhimost', label: 'недвижимость' },
  { key: 'transport', label: 'транспорт' },
  { key: 'uslugi', label: 'услуги' },
  { key: 'elektronika', label: 'электроника' },
  { key: 'rabota', label: 'работа' },
  { key: 'zhivotnye', label: 'животные' },
  { key: 'hobbi-i-otdyh', label: 'хобби-и-отдых' },
  { key: 'lichnye-veshchi', label: 'личные-вещи' },
  { key: 'dlya-doma-i-dachi', label: 'для-дома-и-дачи' },
  { key: 'zapchasti', label: 'запчасти' }
];

exports.getCategories = async (req, res) => {
  return res.json(CATEGORIES);
};
