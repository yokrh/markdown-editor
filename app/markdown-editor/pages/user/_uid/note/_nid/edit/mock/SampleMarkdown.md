# Sample markdown

It's a sample markdown file.

---

fadfadfasfafdaf
fadfasfdadfafasfdafdaf

> Reference

fadfasdf

> Reference
> Reference
> Reference

1. x

    1. xx
        - aaa
        - bbb
        - ccc

    2. yy
        * hoge
        * fuga

    3. zz

2. y

3. z

## h2 hogehoge

*italic*

**emphasis**

~~line through~~

### h3 aaa

  list

  * item 1

    `code.js`

    ```js
    const a = 'aaa'
    const n = 3

    function loopLog(str, num) {
      for (let i = 0; i < num; i++) {
        console.log(str)
      }
    }

    loopLog(a, n)
    ```

  * item 2

    * item 2-a
    * item 2-b
    * item 2-c
    * item 2-d

  * item 3

    nothing

  * item 4

### h3 b

### h3 cc


## h2 fugafuga

[sample link](https://avatars3.githubusercontent.com/u/10173918?s=460&u=caebae8e7d279c8f0420a0f20d8ca64d6da53853&v=4)

<a href="https://avatars3.githubusercontent.com/u/10173918?s=460&u=caebae8e7d279c8f0420a0f20d8ca64d6da53853&v=4" target="_blank" rel="noopener noreferer">sample link with target blank</a>

<img src="https://avatars3.githubusercontent.com/u/10173918?s=460&u=caebae8e7d279c8f0420a0f20d8ca64d6da53853&v=4" alt="sample image" width="120">

![sample image](https://avatars3.githubusercontent.com/u/10173918?s=460&u=caebae8e7d279c8f0420a0f20d8ca64d6da53853&v=4)


## h2 piyopiyo

youtube movie link with thumbnail

<a href="http://www.youtube.com/watch?feature=player_embedded&v=x1ci-O_7AWA
" target="_blank" rel="noopener noreferer"><img src="http://img.youtube.com/vi/x1ci-O_7AWA/0.jpg"
alt="IMAGE ALT TEXT HERE" width="240" height="180" /></a>


## h2 security check

<script>alert('xss!')</script>
';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";
alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--
></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>
<SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>
<IMG SRC="javascript:alert('XSS');">
<IMG SRC=javascript:alert('XSS')>
<IMG SRC=javascript:alert("XSS")>
<a onmouseover="alert(document.cookie)">xxs link</a>
<a onmouseover=alert(document.cookie)>xxs link</a>
<IMG """><SCRIPT>alert("XSS")</SCRIPT>">
<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>
<IMG SRC=# onmouseover="alert('xxs')">
<IMG SRC= onmouseover="alert('xxs')">
<IMG onmouseover="alert('xxs')">
<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>
<img src=x onerror="&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041">

[Click Me](javascript:alert('Uh oh... xss'))
![Uh oh...]("onerror="alert('XSS'))
![Uh oh...](https://www.example.com/image.png"onload="alert('XSS'))
<b onmousemove="alert('XSS')" onclick="alert('XSS')" onmousehover="alert('XSS')" >XSS!</b>
<b　onmousemove="alert('XSS')" style="padding: 10000px;margin: -10000px;">XSS</b>
<b/onmousemove="alert('XSS')">XSS!</b>
<code lang="py" onmousemove='alert("XSS")'>
print(0)
</code>
<iframe srcdoc="<script>alert('XSS');</script>"></iframe>
<iframe src="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk7PC9zY3JpcHQ+">
