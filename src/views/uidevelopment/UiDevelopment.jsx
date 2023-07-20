import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  CCard,
  CCardBody,
  CFormSelect,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const UiDevelopment = () => {

  const [chartDatas, setChartDatas] = useState({});
  const [reportType, setReportType] = useState(null);

  console.log("ChartDataLabels", ChartDataLabels);
  ChartDataLabels.defaults.color = "white"
  ChartDataLabels.defaults.offset = 0
  ChartDataLabels.defaults.padding.left = 0;
  ChartDataLabels.defaults.padding.right = 0;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      console.log("workbook.SheetNames", workbook.SheetNames);
      const worksheet = workbook.Sheets[workbook.SheetNames[5]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(jsonData);
      const charts = {}
      let chartName = '';
      jsonData.forEach(item => {
        if (item.length) {
          if (item.length === 1) {
            const chartNameSplited = item[0].toLowerCase().split(" ").filter(s => !!s).map(s => s.trim());
            console.log("chartNameSplited", chartNameSplited);
            chartName = chartNameSplited.join("_");
            const chartData = {
              labels: [],
              datasets: [
                {
                  label: chartNameSplited[0],
                  backgroundColor: '#b6b6b4',
                  data: [],
                }, {
                  label: chartNameSplited[chartNameSplited.length - 1],
                  backgroundColor: '#50c878',
                  data: [],
                }
              ]
            }
            charts[chartName] = chartData;
          }
          if (item.length > 1) {
            item.forEach((itemData, index) => {
              if (index === 0 && typeof item[index] === 'string') {
                charts[chartName].labels.push(item[index])
              } else {
                charts[chartName].datasets[index - 1].data.push(itemData)
              }
            })
          }
        }
      })
      setChartDatas(charts);
    }

    reader.readAsArrayBuffer(file);
  }

  const onChangeReport = (e) => setReportType(e.target.value);

  return (
    <>
      <div className='d-flex gx-4 align-items-center'>
        <div>
          Upload file : <input type="file" className="mb-4" onChange={handleFileUpload} title="Browse file to see charts and graphs" />
        </div>
        <div className="d-flex justify-start mb-4 align-items-center">
          <span>Select report type : </span>
          <div className="ms-2">
            <CFormSelect
              aria-label="Default select example"
              options={[
                'Open this select menu',
                { label: 'Planned And DevDone', value: 'planned_and_devdone' },
                { label: 'Count of Status', value: '2' },
                { label: 'Commitment and Completed', value: 'committment_and_completed' },
                { label: 'Count of Assignee', value: '4' }
              ]}
              onChange={onChangeReport}
            />
          </div>
        </div>
      </div>
      <div className="row gx-4">
        <CCard className="mb-4">
          <CCardBody>
            <div className='d-flex justify-content-between mb-4'>
              <h4 id="traffic" className="card-title mb-0">
                Planned And DevDone
              </h4>
            </div>
            {chartDatas[reportType] ? <CChartBar data={chartDatas[reportType]} /> : <div className="py-4">No data available</div>}
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default UiDevelopment
