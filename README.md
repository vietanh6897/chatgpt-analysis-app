# Table of Contents

- Version
- Installation
- Notes

# Version

[`version that I use in project`]
Node.js (`v20.11.0`)
npm (`10.2.4`)
Angular (`v17`)

# Installation

- Open Git Bash and type `git clone https://github.com/vietanh6897/chatgpt-analysis-app.git`
- Open root folder by IDE
- Open new terminal
- Run `npm install` then type `npm start`

# Notes

[`Base on my understand about requirements`]

- Show data for past 12 months from current (2013 and 2014)
- Only include `%` change per month if the previous month data exist.
- `Profit` = `TotalIncome` - `TotalExpenses` ( I set max digit after decimal point = 2)
- I ignored calculating `profit and income % change` if it's the `first` month of calculating year
- I don't calculate `profit and income % change` if the previous month value `= null`
- The fomular for `income % change` = (TotalIncome[MonthID] - TotalIncome[MonthID-1])/Math.abs(TotalIncome[MonthID-1])
- Formular for `profit % change` is similar to `totalIncome`
