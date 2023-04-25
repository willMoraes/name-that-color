export function getColorsInfos(colors: any) {
  const colorValues = Object.values(colors);
  const colorKeys = Object.keys(colors);
  const colorsWithNames: any = []
  
  colorValues.forEach((color, index) => {
    const [name, hex] = window?.ntc.name(color)

    colorsWithNames.push({ ntcHex: name, ntcName: hex, hex: color, name: colorKeys[index]})
  })

  return colorsWithNames
}

export function groupColorsByName(colors: any) {  
  const groupedObj: any = {}
  
  colors.forEach(function(color:any) {
    const name = color.ntcName

    groupedObj[name] = groupedObj[name] || []
    groupedObj[name].push(color)
  })

  return groupedObj;
}

export function getColorsWithOneItem(colors: any) {
  const colorsWithOneItem: any = []

  Object.keys(colors).forEach((color) => {
    if (colors[color].length === 1) {
      colorsWithOneItem.push(colors[color][0])
    }
  })

  return colorsWithOneItem
}

export function formatColorsWithName(colors: any) {
  const colorsWithNames: any = {}

  Object.values(colors).forEach((color) => {
    const key = `"${color.ntcName.toLowerCase().replace(/ /g, '-')}"`
    colorsWithNames[key] = color.hex
  })

  return colorsWithNames
}
