class GeneralUtils {
  deleteElementInCollectionByIndex<T>(collection: Array<T>, indexToDelete: number ) {
    return collection.filter( (element: T, index: number) => {
      if (index !== indexToDelete) {
        return element;
      } 
    } )
  }
}

export default new GeneralUtils();