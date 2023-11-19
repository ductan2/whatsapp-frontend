export const capitalizeName = (word: string) => {
   let result = "";
   const temp = word.split(" ");
   temp.forEach((element) => {
      result += element[0].toUpperCase() + element.slice(1) + " ";
   })
   return result.trim();
}