import { useState } from "react"
import styles from "./Form.module.css"

const Form = () => {
    const [pesoTemp, setPesoTemp] = useState('')
    const [alturaTemp, setAlturaTemp] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [showResult, setShowResult] = useState(false)
    const imc = (peso / (altura * altura)*10000).toFixed(2)
    
    const configInputPeso = (e) => {
        let input = e.target.value.replace(/[^0-9]/g, '')
        input = input.slice(0, 3)
        setPesoTemp(input)           
    }

    

    const configInputAltura = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '')
        setAlturaTemp(input)
    }

    const formataAltura = (alturaTemp) => {
        return alturaTemp ? `${alturaTemp.slice(0, 1)},${alturaTemp.slice(1)}` : '';
      };
    
      const getClassificacao = () => {
        
        if(imc < 18.5){
            return "Magreza"
        } else if (imc >= 18.5 && imc <= 24.99){
            return "Normal"
        } else if (imc >= 25 && imc <= 29.99){
            return "Sobrepeso"
        } else if (imc >= 30 && imc <= 39.99){
            return "Obesidade"
        } else if (imc >40){
            return "Obesidade Grave"
        }
      }

      const renderizaResultado = (e) => {
        e.preventDefault()
        setPeso(parseInt(pesoTemp))
        setAltura(parseInt(alturaTemp))
        if (pesoTemp && alturaTemp){
            setShowResult(true)
        } else {
            alert('Digite o peso e altura')
            setShowResult(false)
        }
      }
     

    return(
        <div className={styles.containerPrincipal}>
            <h3 className={styles.subtitle}>Digite abaixo seu peso e altura</h3>
            <form className={styles.form}>
                <input className={styles.input} type="text" pattern="[0-9]{0,3}" placeholder="Informe seu peso" onChange={configInputPeso} value={pesoTemp}/>
                <input className={styles.input} type="text" maxLength={4} placeholder="Informe sua altura" onChange={configInputAltura} value={formataAltura(alturaTemp)}/>
                <button className={styles.btn} onClick={renderizaResultado}>Calcular</button>
            </form>
            {showResult && (
            <div className={styles.container}>
                <h3 className={styles.imcTitle}>Seu IMC:</h3>
                <p className={styles.imc}>{imc}</p>
                <p className={styles.classificationTitle}>Classificação:</p>
                <p className={styles.classification}>{getClassificacao()}</p>
            </div>
        )}
        </div>
    )
}

export default Form