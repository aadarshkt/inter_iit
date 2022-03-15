import Papa from 'papaparse'

export const parseCSV = (csv) => {
    return Papa.parse(csv)
}