import React from 'react'
import { Text } from 'react-native'


// workaround to handle dynamic text-highlight
export default (text) => {
  const tags = ['<strong>', '<b>']
  text = text.split(/(<.*?>.*?<\/.*?>)/g);
  return text.map((elem, index) => {
    const word = elem.replace(/<.*?>(.*?)<\/.*?>/, '$1')
    if (elem.includes(tags[0]) || elem.includes(tags[1])) {
      return <Text style={{fontWeight:'bold'}} key={index}>{word}</Text>
    } else {
      return <Text key={index}>{word}</Text>
    }
  })
}