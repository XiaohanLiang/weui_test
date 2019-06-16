var Parser = require("../lib/xmldom/dom-parser.js");

module.exports = {
    parser : parser
};

function parser(xmlRawString){

    var parser = new Parser.DOMParser();
    var doc = parser.parseFromString(xmlRawString,"text/xml");

    var ret = new Array()
    var topics = doc.getElementsByTagName('item')

    // 尽量避免使用 index in range 可能会进一些奇怪的东西
    for (var index = 0; index<topics.length; index++) {
        var t = topics[index]

        if (t.hasOwnProperty("childNodes")){

            var title = t.getElementsByTagName("title")
            var titleString = title.toString()
            var parsedTitle = parseWithPattern(parser,titleString,"title")

            var date = t.getElementsByTagName("pubDate")
            var dateString = date.toString()
            var parsedDate = parseWithPattern(parser,dateString,"pubDate")

            var link = t.getElementsByTagName("link")
            var linkString = link.toString()
            var parsedLink = parseWithPattern(parser,linkString,"link")

            var author = t.getElementsByTagName("author")
            var authorString = author.toString()
            var parsedAuthor = parseWithPattern(parser,authorString,"author")

            var description = t.getElementsByTagName("description")
            var descriptionString = description.toString()
            var descriptionWOBrace = parseWithPattern(parser,descriptionString,"description")
            var toXmlAgain = parser.parseFromString(descriptionWOBrace,"text/xml");
            var parsedParagraph = parseParagraph(toXmlAgain)

            ret.push({
                title : parsedTitle,
                date : parsedDate,
                link : parsedLink,
                author : parsedAuthor,
                content : parsedParagraph,
            })

        }
    }
    console.log("In summary the ret is")
    console.log(ret)
    return ret
}

function parseWithPattern(parser,raw,pattern){

    //  这个函数只能用于Parse一个单行的内容,就像下面这样
    //  用法:  ret = parseWithPattern(parser,doc2,"link")
    // `<title><![CDATA[ 已经被某爱国手机断触现象搞疯了，求推荐一款 ]]></title>`
    // <link>https://www.v2ex.com/t/574336</link>

    var ret = ""
    var doc = parser.parseFromString(raw,"text/xml")
    var general = doc.getElementsByTagName(pattern)[0]

    if (general.hasOwnProperty("childNodes")){
        for(let index in general.childNodes){
            if (general.childNodes[index].hasOwnProperty("nodeValue")){
                ret += general.childNodes[index].nodeValue
            }
        }
    }

    return ret
}

function parseParagraph(raw){
    var ret = ""
    var lines = raw.getElementsByTagName("p")
    for (let index in lines){
        if (lines[index].hasOwnProperty("firstChild") && lines[index].firstChild.hasOwnProperty("nodeValue")){
            ret += "\n\n" + lines[index].firstChild.nodeValue
        }
    }
    return ret
}