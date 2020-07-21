import _ from 'lodash';
export function paginate(movies,pageNumber,pageSize){
    const startIndex=(pageNumber-1)*pageSize;
    // _.slice(items,startIndex) => // slice the items array from the startindex;
    // _.take(items,pageSize) => // for picking the item from the items aaray for the currentPage
    //  to use both these methods in a chain first we need to covert our array in a lodash rapper => _(items)=> gives an object
    // then again we need to covert our rapper to a regular array bu using value method
    return _(movies).slice(startIndex).take(pageSize).value();
}