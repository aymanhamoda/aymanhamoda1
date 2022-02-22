// assume time with unit= min
const rateUnits = [
  //kg,mg,mcg,min,hr
  { id: '', label: 'Select Unit' },
  { id: 'ml/hr', label: 'ml/hr' },
  { id: 'mg/kg/hr', label: 'mg/kg/hr' },
  { id: 'mg/kg/min', label: 'mg/kg/min' },
  {
    id: 'mcg/kg/hr',
    label: 'mcg/kg/hr',
  },
  {
    id: 'mcg/kg/min',
    label: 'mcg/kg/min',
  },
  { id: 'mg/hr', label: 'mg/hr' },
  { id: 'mg/min', label: 'mg/min' },
  { id: 'mcg/hr', label: 'mcg/hr' },
  { id: 'mcg/min', label: 'mcg/min' },
  // { id: 'amp/day', label: 'amp/day' },
]
export default rateUnits
