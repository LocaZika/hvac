'use server'
export default async function filterAction(formData: FormData){
  const filterOptions = Object.fromEntries(formData.entries());
  console.log('>>filterAction: ', filterOptions);
}