import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { CCard, CCardBody, CFormSelect, CTooltip } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const UiDevelopment = () => {
  const [chartDatas, setChartDatas] = useState({})
  const [reportType, setReportType] = useState(null)

  console.log('ChartDataLabels', ChartDataLabels)
  ChartDataLabels.defaults.color = 'white'
  ChartDataLabels.defaults.offset = 0
  ChartDataLabels.defaults.padding.left = 0
  ChartDataLabels.defaults.padding.right = 0

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      let jsonData = []
      if (file.name.endsWith('.csv')) {
        const csvData = e.target.result
        const csvResult = Papa.parse(csvData, { header: true })
        jsonData = csvResult.data.map((item) => Object.values(item).filter((v) => !!v))
      } else {
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetIndex = workbook.SheetNames.indexOf('UI')
        const worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]]
        jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      }
      console.log('jsonData', jsonData)
      const charts = {}
      let chartName = ''
      jsonData.forEach((item) => {
        if (item.length) {
          if (item.length === 1) {
            const chartNameSplited = item[0]
              .toLowerCase()
              .split(' ')
              .filter((s) => !!s)
              .map((s) => s.trim())
            chartName = chartNameSplited.join('_')
            const chartData = {
              labels: [],
              datasets: [
                {
                  label: chartNameSplited[0],
                  backgroundColor: '#b6b6b4',
                  data: [],
                },
                {
                  label: chartNameSplited[chartNameSplited.length - 1],
                  backgroundColor: '#50c878',
                  data: [],
                },
              ],
            }
            charts[chartName] = chartData
          }
          if (item.length > 1) {
            item.forEach((itemData, index) => {
              if (index === 0 && typeof item[index] === 'string') {
                charts[chartName].labels.push(item[index].replace('MAD UI: ', ''))
              } else {
                charts[chartName].datasets[index - 1].data.push(itemData)
              }
            })
          }
        }
      })
      setChartDatas(charts)
    }
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <>
      <div>
        Upload file :{' '}
        <input
          type="file"
          className="mb-4"
          onChange={handleFileUpload}
          title="Browse file to see charts and graphs"
        />
      </div>
      <div className="row gx-4">
        <div className="col-6">
          <CCard className="mb-4">
            <CCardBody>
              <div className="d-flex justify-content-between mb-4">
                <h4 id="traffic" className="card-title mb-0">
                  MAD-UI: Planned And DevDone
                </h4>
              </div>
              {chartDatas?.planned_and_devdone ? (
                <CChartBar data={chartDatas?.planned_and_devdone} />
              ) : (
                <div className="py-4">No data available</div>
              )}
            </CCardBody>
          </CCard>
        </div>
        <div className="col-6">
          <CCard className="mb-4">
            <CCardBody>
              <div className="d-flex justify-content-between mb-4">
                <h4 id="traffic" className="card-title mb-0">
                  MAD-UI: Committment and Completed
                </h4>
              </div>
              {chartDatas?.committment_and_completed ? (
                <CChartBar data={chartDatas?.committment_and_completed} />
              ) : (
                <div className="py-4">No data available</div>
              )}
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  )
}

export default UiDevelopment
