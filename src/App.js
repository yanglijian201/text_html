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

  const handlePreviewInNewTab = () => {
    if (!isValid) {
      alert('请先输入有效的 HTML 代码');
      return;
    }

    // 创建完整的 HTML 文档
    const fullHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML 预览</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
    }
  </style>
</head>
<body>
${htmlInput}
</body>
</html>
    `.trim();

    // 打开新标签页
    const newTab = window.open('', '_blank');
    
    if (newTab) {
      newTab.document.open();
      newTab.document.write(fullHTML);
      newTab.document.close();
    } else {
      alert('无法打开新标签页，请检查浏览器的弹窗拦截设置');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HTML 验证和预览工具</h1>
        <p>输入 HTML 代码进行验证，并在新标签页中预览</p>
      </header>

      <main className="App-main">
        <div className="input-section">
          <div className="section-header">
            <h2>HTML 输入</h2>
            <div className="button-group">
              <button 
                className="preview-button" 
                onClick={handlePreviewInNewTab}
                disabled={!isValid}
              >
                在新标签页预览
              </button>
              <button className="clear-button" onClick={handleClear}>
                清空
              </button>
            </div>
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
                  <span>HTML 格式有效 - 点击上方按钮在新标签页中预览</span>
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
      </main>

      <footer className="App-footer">
        <p>⚠️ 提示：请勿输入恶意代码。本工具仅用于学习和测试目的。</p>
      </footer>
    </div>
  );
}

export default App;
