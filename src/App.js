import React, { useState } from 'react';
import './App.css';

function App() {
  const [htmlInput, setHtmlInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const validateHTML = (html) => {
    if (!html.trim()) {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const parseErrors = doc.querySelectorAll('parsererror');

      if (parseErrors.length > 0) {
        setIsValid(false);
        setErrorMessage('HTML 格式无效：存在解析错误，请检查标签是否正确闭合。');
      } else {
        setIsValid(true);
        setErrorMessage('');
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage('HTML 验证出错：' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setHtmlInput(value);
    validateHTML(value);
  };

  const handleClear = () => {
    setHtmlInput('');
    setIsValid(null);
    setErrorMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HTML 验证和预览工具</h1>
        <p>输入 HTML 代码进行验证和预览</p>
      </header>

      <main className="App-main">
        <div className="input-section">
          <div className="section-header">
            <h2>HTML 输入</h2>
            <button className="clear-button" onClick={handleClear}>
              清空
            </button>
          </div>
          <textarea
            className="html-input"
            value={htmlInput}
            onChange={handleInputChange}
            placeholder="在此输入 HTML 代码..."
            spellCheck="false"
          />
        </div>

        {htmlInput && (
          <div className="validation-section">
            <h2>验证结果</h2>
            <div className={`validation-result ${isValid ? 'valid' : 'invalid'}`}>
              {isValid === true && (
                <div className="valid-message">
                  <span className="icon">✅</span>
                  <span>HTML 格式有效</span>
                </div>
              )}
              {isValid === false && (
                <div className="invalid-message">
                  <span className="icon">❌</span>
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {isValid === true && (
          <div className="preview-section">
            <h2>渲染预览</h2>
            <div className="preview-container">
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{ __html: htmlInput }}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>⚠️ 提示：请勿输入恶意代码。本工具仅用于学习和测试目的。</p>
      </footer>
    </div>
  );
}

export default App;
