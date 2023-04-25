import Script from "next/script"
import { useEffect, useState } from "react"

import '../app/globals.css'

import { COLOR_PALETTE, COLORS_WITH_INCIDENCE } from "@/constants/"

import { getColorsInfos, groupColorsByName, getColorsWithOneItem, formatColorsWithName } from "@/utils"

export default function NameThatColor() {
  const [isAttributeLoaded, setIsAttributeLoaded] = useState(false)
  const [colors, setColors] = useState<any>([]);
  
  useEffect(() => {
    if (isAttributeLoaded) {
      const colorInfos = getColorsInfos(COLOR_PALETTE)
      const groupedColors = groupColorsByName(colorInfos);
      const colorsWithOneItem = getColorsWithOneItem(groupedColors);

      setColors(groupedColors)
    }
  }, [isAttributeLoaded]);
  
  function renderColorContainer() {
    if (!isAttributeLoaded) return null 

    return Object.keys(colors).map((key) => {
      const currentColors = colors[key];

      return (
        <div className="border px-4 py-2 rounded-lg flex-auto" key={key}>
          <div className="mb-3" >
            <h2 className='capitalize mb-2 font-semibold'>{key}</h2>
            {renderColorItems(currentColors)}
          </div>
        </div>
      )
    })
  }

  function getColorIncidence(color: any) {
    return COLORS_WITH_INCIDENCE[color as keyof typeof COLORS_WITH_INCIDENCE] || 0
  }
    
  function renderColorItems(colors: any) {
    return (
      <div className="flex flex-wrap gap-4">
        {colors.map((color: any) => (
          <div key={color.hex}>
            <div  className="w-40 h-14 shadow-md rounded-lg mb-2" style={{ backgroundColor: color.hex }} />
            <div className="flex justify-between w-full">
              <p className="text-xs text-gray-400">Name: </p>
              <p className="text-xs text-gray-600 text-[10px]">{color.name}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xs text-gray-400">Hex: </p>
              <p className="text-xs text-gray-600">{color.hex}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xs text-gray-400">Incidence: </p>
              <p className="text-xs text-gray-600">{getColorIncidence(color.hex)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
        
  return (
    <>
      <div>
        <div className="flex gap-2 flex-wrap">
          {renderColorContainer()}
        </div>
      </div>
      <Script 
        src="https://chir.ag/projects/ntc/ntc.js"
        strategy="afterInteractive"
        onLoad={() => {setIsAttributeLoaded(true)}}
      />
    </>
  )
}