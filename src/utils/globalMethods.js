export function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  
export function getCountry(array,id){
  return array.filter(items=>{
   return items.value==id
  })[0].label
}

export function getCountryID(array,id){
  return array.filter(items=>{
   return items.label==id
  })[0].value
}