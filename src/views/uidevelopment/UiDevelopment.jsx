import React from 'react'
import * as XLSX from 'xlsx'

import {
  CCard,
  CCardBody,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const UiDevelopment = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

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
    }

    reader.readAsArrayBuffer(file);
  }

  return (
    <div className='d-flex'>
      <div>
        <CCard className="mb-4">
          <CCardBody>
            <div className='d-flex'>
              <div>
                <h4 id="traffic" className="card-title mb-0">
                  Planned And DevDone
                </h4>
              </div>
              <div><input type="file" onChange={handleFileUpload} /></div>
            </div>
            <CChartLine
              style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: [
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                    ],
                    fill: true,
                  },
                  {
                    label: 'My Second dataset',
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-success'),
                    pointHoverBackgroundColor: getStyle('--cui-success'),
                    borderWidth: 2,
                    data: [
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                      random(50, 200),
                    ],
                  },
                  {
                    label: 'My Third dataset',
                    backgroundColor: 'transparent',
                    borderColor: getStyle('--cui-danger'),
                    pointHoverBackgroundColor: getStyle('--cui-danger'),
                    borderWidth: 1,
                    borderDash: [8, 5],
                    data: [65, 65, 65, 65, 65, 65, 65],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                  y: {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(250 / 5),
                      max: 250,
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
              }}
            />
          </CCardBody>
        </CCard>
      </div>
      <div></div>
    </div>

  )
}

export default UiDevelopment
