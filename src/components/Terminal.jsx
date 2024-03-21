
import {about, routes, commands, certificates, experience, education, contact} from "../scripts/terminal.js"
import React, { useRef, useState, createElement, useEffect } from 'react'
import { navigate } from "astro:transitions/client";


function Terminal({children, floating}) {
    const [history, setHistory] = useState([])
    const [content, setContent] = useState([])
    const [selected, setSelected] = useState(0)
    const [clear, setClear] = useState(false)
    const outRef = useRef()
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus();
        let cont = sessionStorage.getItem('content')
        let hist = sessionStorage.getItem('history')
        if(cont && hist){
            setContent(JSON.parse(sessionStorage.getItem('content')))
            setHistory(JSON.parse(sessionStorage.getItem('history')))
        }
      }, []);

    useEffect(() => {
        sessionStorage.setItem('content',  JSON.stringify(content));
        sessionStorage.setItem('history', JSON.stringify(history));
     }, [content, history]);

    function focusInput(e){
        e.target.focus()
    }

    function handleInput(e){
        if( e.key === "Enter"){
             e.preventDefault();
             inputCommand(e.target.value)
             e.target.value = ""
             setSelected(0) 
        }
        if( e.key === "Enter" && e.target.value.startsWith("cd ")){
            e.preventDefault();
            inputCommand(e.target.value)
            e.target.value = ""
            setSelected(0) 
       }
        if( e.key === "Escape"){
            e.target.value = ""
            setSelected(0) 
        }
        if( e.key === "ArrowUp"){
            if(selected  < history.length){
                e.target.value = history[selected]
                setSelected(selected + 1) 
             }
        }
        if( e.key === "ArrowDown"){
            if(selected  > 0){
                e.target.value = history[selected - 1]
                setSelected(selected - 1) 
             }
        }

        setTimeout(()=> {
            outRef.current.scrollTop = outRef.current.scrollHeight;
        }, 50)
    }

    function inputCommand(cmd){
        let newContent = [];
        let parsedCmd = cmd.toLowerCase().trim().replace(/\s+/g,' ').split(" ")
        let command = parsedCmd[0]
        switch(command){
            case "":
                return;
            case "cd":
                let param = parsedCmd[1]
                if(!param){
                    newContent.push({element: "div", options: {className: "inline invalid"},text: `need to specify a route`}) 
                }else if(routes[param]){
                    newContent.push({element: "div", options: {className: "inline"},text: `moved to '/${param}'`}) 

                    navigate(routes[param])
                }else{
                    newContent.push({element: "div", options: {className: "inline invalid"},text: `route '/${param}' doesn't exist`}) 
                }
                break
            case "help":
                newContent.push({element: "div", options: {className: "inline"},text: `list of available commands, use Up and Down Arrows to access command history`}) 
                Object.entries(commands).forEach(([key, value]) => {
                    newContent.push({element: "br"})
                    newContent.push({element: "div", options: { className: "singleCommand inline"}, text: `${key} -`})
                    newContent.push({element: "div", options: { className: "inline"}, text: ` ${value} `})
                });
                break; 
            case "clear":
                newContent.push({element: "div", options: {className: "inline"}, text: `type 'help' to list available commands`}) 
                setContent([newContent])
                setClear(true)
                break;
            case "about":
                about?.forEach((element,i) => {
                    if(i % 2 === 0){
                        newContent.push({element: "div", options: { className: "singleCommand"}, text: element})
                    }else{
                        newContent.push({element: "div", options: {className: ""}, text: element})
                    }
                });
                break;
            case "education":
                newContent.push({element: "div", options: { className: "inline"}, text: `education`})
                newContent.push({element: "br"})
                Object.entries(education).forEach(([key, value]) => {
                    newContent.push({element: "div", options: { className: "singleCommand inline"}, text: `${key} -`}) 
                    newContent.push({element: "a", options: { className: "", target: "_blank", href: value}, text: ` ${value} `}) 
                    newContent.push({element: "br"})
                });
                break;
            case "experience":
                newContent.push({element: "div", options: { className: "inline"}, text: `experience and projects`})
                newContent.push({element: "br"})
                Object.entries(experience).forEach(([key, value]) => {
                    newContent.push({element: "div", options: { className: "singleCommand inline"}, text: `${key} -`}) 
                    newContent.push({element: "a", options: { className: "", target: "_blank", href: value}, text: ` ${value} `}) 
                    newContent.push({element: "br"})
                });
                break;
            case "certificates":
                newContent.push({element: "div", options: { className: "inline"}, text: `certificates`})
                newContent.push({element: "br"})
                Object.entries(certificates).forEach(([key, value]) => {
                    newContent.push({element: "div", options: { className: "singleCommand inline"}, text: `${key} -`}) 
                    newContent.push({element: "a", options: { className: "", target: "_blank", href: value}, text: ` ${value} `}) 
                    newContent.push({element: "br"})
                });
                break;
            case "contact":
                 newContent.push({element: "div", options: { className: "inline"}, text: `contact links`})
                 newContent.push({element: "br"})
                Object.entries(contact).forEach(([key, value]) => {
                    newContent.push({element: "div", options: { className: "singleCommand inline"}, text: `${key} -`}) 
                    newContent.push({element: "a", options: { className: "", target: "_blank", href: value}, text: ` ${value} `}) 
                    newContent.push({element: "br"})
                });
                break;
            default:
                newContent.push({element: "div", options: { className: "invalid inline"}, text: `invalid command "${cmd}", type 'help' to list available commands`}) 
                break        
        }
        if(cmd != "clear"){
            setContent([...content, newContent])
        }
        setHistory([cmd, ...history ])
    }

  return (
    
     <div className="terminal-container"  transition:animate="slide" >
        <div className="terminal">
            <div className="terminal-output" ref={outRef}>
                { !clear && 
                    <>
                        <div className="directory"> 
                                    <span className="cmdhead1">guest@juanm</span> 
                                    <span className="cmdhead2">→</span> 
                                    <span className="cmdhead3">myportfolio:$ </span>
                        </div>
                    {children}
                    </>
                }
                {
                    content.map((entry, i) => ( 
                        <div key={i} className="terminalContentContainer">
                            <div className="directory"> 
                                <span className="cmdhead1">guest@juanm</span> 
                                <span className="cmdhead2">→</span> 
                                <span className="cmdhead3">myportfolio:$ </span>
                            </div>
                            {
                                entry.map(({element, options, text}, j) => (
                                    createElement(element, {key: j, ...options }, text)
                                ))
                            } 
                        </div>
                    ))
                }
            </div>
            <div className="input-container">
                <div className="directory maindir"> 
                    <span className="cmdhead1">guest@juanm</span> 
                    <span className="cmdhead2">→</span> 
                    <span className="cmdhead3">myportfolio:$ </span>
                </div>
                
                <input ref={inputRef} className="terminal-input" onBlur={focusInput} onKeyDown={handleInput} /> 
          
            </div>
        </div>
    </div>
  )
}

export default Terminal