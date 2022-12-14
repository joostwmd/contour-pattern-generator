import React from 'react'
import axios from 'axios'
import { SERVER_URL } from './clientVariables'
import { useState } from 'react'
import templateImg from './template.png'

function Home() {

    const [svgStr, setSvgStr] = useState('')
    const [fileName, setFileName] = useState('')
    const [status, setStatus] = useState(0)
    const [templateString, setTemplateString] = useState('')


    function previewFile() {
        const content = document.querySelector('.content');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // this will then display a text file
            //content.innerText = reader.result;

            setSvgStr('<svg' + reader.result.split('<svg')[1].replaceAll('0cm', '1cm'))
            document.getElementById('svgContainer').innerHTML = svgStr
        }, false);

        if (file) {
            const svg = reader.readAsText(file)
            setFileName(file.name.replace('.svg', ''))
        }
    }




    




    const getTemplate = (svg, file) => {
        const requestBody = { svg, file }
        axios.post(`${SERVER_URL}/test`, requestBody)

        setTimeout(() => {
            setStatus(1)
        }, "2500")
    }

    if (status === 0) {
        return (
            <div>
                <h1>home</h1>
                <h1>upload input</h1>
                <input type="file" onChange={() => previewFile()} /><br />

                <div id='svgContainer'>
                    <h1>template</h1>
                </div>

                <button
                    onClick={() => { getTemplate(svgStr, fileName) }}
                >
                    template test
                </button>
            </div>
        )
    } else if (status === 1) {
        return (
            <div>
                <h1>ta daaa</h1>
                <img src={templateImg} id='templateImg' />
                <button
                    onClick={() => { setStatus(0) }}
                >
                    another one
                </button>
            </div>
        )
    }
}

export default Home
