import React from 'react';
import {Checkbox , Radio, TextBox , TextInput } from "./components/Form"
import "./page.css"
import './App.css';
import VideoPlayer from 'react-video-markers';
import Plyr from 'react-plyr';
import "../node_modules/video-react/dist/video-react.css"
import { Player } from 'video-react';
class App extends React.Component{
  state={
    lessons:[{
      number:1,
      title:"درس"
    },
    {
      number:2,
      title:"درس"
    },
    {
      number:3,
      title:"درس"
    },
    {
      number:4,
      title:"درس"
    }],
    lession_css:["purple","yellow","green","red"],
      options: {
        poster: "http://pic2.52pk.com/files/130514/1283314_143556_2145.jpg",
        sources: [{
          type: "video/mp4",
          src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }],
        subtitles: [{
            language: 'zh',
            url: "https://peng666.github.io/react-awesome-player/zh.vtt",
            label: "中文"
          },
          {
            language: 'en',
            url: "https://peng666.github.io/react-awesome-player/en.vtt",
            label: "EN"
        }],
        defaultSubtitle: 'en'
      },
    questions:[{
      type:1,
      header:"اختار كل الاجابات الصحيحه",
      set:[{
        test:"اى من هذه البلاد تقع فى افريفيه",
        choices:[
          {
            id:1,
            text:"مصر",
            checked:false
          },
          {
            id:2,
            text:"عمان",
            checked:false

          },
          {
            id:3,
            text:"المغرب",
            checked:false
          }
        ],
        answer_id:[1,2],
        answer:[],
        wrong:false
      },
      {
        test:"اى من هذه البلاد تقع فى افريفيه",
        choices:[
          {
            id:1,
            text:"مصر",
            checked:false

          },
          {
            id:2,
            text:"عمان",
            checked:false

          },
          {
            id:3,
            text:"المغرب",
            checked:false

          }
        ],
        answer_id:[2,3],
        answer:[],
        wrong:false
      }]
    },
    {
      type:2,
      header:"اختار الاجابه الصحيحه",
      set:[{
        test:"اى من هذه البلاد تقع فى افريفيه",
        choices:[
          {
            id:1,
            text:"مصر",
            checked:false

          },
          {
            id:2,
            text:"عمان",
            checked:false

          },
          {
            id:3,
            text:"المغرب",
            checked:false

          }
        ],
        answer_id:3,
        answer:null,
        wrong:false
      },
      {
        test:"اى من هذه البلاد تقع فى افريفيه",
        choices:[
          {
            id:1,
            text:"مصر",
            checked:false

          },
          {
            id:2,
            text:"عمان",
            checked:false
          },
          {
            id:3,
            text:"المغرب",
            checked:false

          }
        ],
        answer_id:1,
        answer:null,
        wrong:false
      }]
    },
    {
      type:3,
      header:"مقارنه",
      set:[{
        header:"header1",
        answer_id:"textt",
        wrong:false,
        answer:null
      },
      {
        header:"header1",
        answer_id:"textt",
        answer:null,
        wrong:false
      }]
    },
    {
      type:4,
      header:"اى الجملتين صحيح",
      set:[{
        choices:[
          {
            id:1,
            text:"تقع مصر فى افريقيا",
            checked:false
          },
          {
            id:2,
            text:"تقع عمان فى افريقيا",
            checked:false
          }],
        answer_id:2,
        answer:null,
        wrong:false
      },
      {
        choices:[
          {
            id:1,
            text:"تقع مصر فى افريقيا"
          },
          {
            id:2,
            text:"تقع عمان فى افريقيا"
          }],
        answer_id:1,
        answer:null,
        wrong:false
      }]
    },
    {
      type:5,
      header:"اكمل",
     set:[
       {
         text:"تقع مصر فى",
         answer_id:"افريقيا",
         answer:null,
         wrong:false
       },
       {
        text:"تقع مصر فى",
        answer_id:"افريقيا",
        answer:null,
        wrong:false
      },
      {
        text:"تقع مصر فى",
        answer_id:"افريقيا",
        answer:null,
        wrong:false
      }
     ]
    }],
    has_mistakes:false,
    result:0,
    done:false,
    isPlaying: false,
    volume: 0.7
  }
  draw_question_div=()=>{
    return this.state.questions.length>0?
    this.state.questions.map((question,i)=>(
      <div className="column is-6">
        <div className={`question-div ${i%2? "yellow":"green"}`}>
          <p className="question-header">{question.header}</p>
          <div className="pad-10-30">
            {this.render_questions(question)}
          </div>
        </div>
      </div>
    )):null
  }

  render_questions= question =>{
    if(question.type==1){
      return this.render_choices(question.set)
    }
    if(question.type==2){
      return this.render_choose(question.set)

    }
    if(question.type==3){
      return this.render_compare(question)
    }
    if(question.type==4){
      return this.render_texts(question.set)
    }
    if(question.type==5){
      return this.render_complete(question.set)
    }
  }
  render_choices= set =>{
    return set.map((question,i)=>(
      <div>
        <p className="question-text">{question.test}</p>
        <div className="is-flex">
          {this.render_choices_solutions(question.choices,i)}
        </div>
      </div>
    ))
  }

  render_choices_solutions= (choices, set_index)=>{
    let has_mistakes=this.state.has_mistakes
    let questions=this.state.questions
    return choices.map((choice,i)=>(
      <div className="answer is-flex aic">
            <Checkbox 
              disabled={has_mistakes}
              ischecked={choice.checked}
              onClick={ () =>{
                //const result = question.answers.filter(id => id==question.choices[0].id);
                let answers=questions[0].set[set_index].answer
                questions[0].set[set_index].choices[i].checked=!choice.checked
                let ischecked=questions[0].set[set_index].choices[i].checked
                if(ischecked){
                  answers.push(choice.id)
                }else
                {
                  var index = answers.indexOf(choice.id);
                  if (index !== -1) answers.splice(index, 1);
                }
                questions[0].set[set_index].answer=answers
                this.setState({
                  questions:questions
                })
              }}
            />
            <p className={`question-text 
            ${has_mistakes? questions[0].set[set_index].answer_id.indexOf(choice.id)!=-1?
               "wrong":"":""} `}>
              {choice.text}
            </p>
          </div>
    ))
  }
  render_choose= set =>{
    return set.map((question,i)=>(
      <div>
        <p className="question-text">{question.test}</p>
        <div className="is-flex">
          {this.render_choose_solutions(question.choices,i,1)}
        </div>
      </div>
    ))
  }

  render_choose_solutions = (choices,set_index, quetion_index) =>{
    let has_mistakes=this.state.has_mistakes
    let questions=this.state.questions

    return choices.map((choice,i)=>(
      <div className="answer is-flex aic">
        <Radio 
          disabled={this.state.has_mistakes}
          ischecked={choice.checked}
          onClick={ () =>{
            
            questions[quetion_index].set[set_index].choices.map((choice,j)=>{
              questions[quetion_index].set[set_index].choices[j].checked=false
            })
            questions[quetion_index].set[set_index].choices[i].checked=true

            questions[quetion_index].set[set_index].answer=choice.id
            
            this.setState({
              questions:questions
            })

          }}
        />
        <p className={`question-text 
            ${has_mistakes? questions[quetion_index].set[set_index].answer_id==choice.id?
               "wrong":"":""} `}>
          {choice.text}
        </p>
      </div>
    ))

  }

  render_compare = question =>{
    let has_mistakes=this.state.has_mistakes
    return <div className="columns no-gap ">

        {
          question.set.map((part,i)=>(
            <div className="column is-6 border">
              <p className="question-text">{part.header}</p>
              <TextBox
                disabled={ has_mistakes}
                onChange={(e)=>{
                  let questions=this.state.questions
                  questions[2].set[i].answer=e.target.value
                  this.setState({
                    questions:questions
                  })
                }}
                placeholder={this.state.has_mistakes? part.answer_id:null}
              />
            </div>
          ))
        }
      

    </div>
  }

  
  render_texts= set =>{
    return set.map((question,i)=>(
      <div  className="mar-bot-20">
        {this.render_choose_solutions(question.choices,i,3)}
      </div>
    ))
  }

  calculate_result=()=>{
    let result=0
    this.state.questions.map((question)=>{
      console.log(question)
      question.set.map((set)=>{
        if(Array.isArray(set.answer_id)&& Array.isArray(set.answer)){
          if(this.arraysEqual(set.answer,set.answer_id)){
            result++
          }
         } else{
            if(set.answer_id==set.answer){
              if(question.type==3){
                result=result+0.5
              }
              else{
                result++

              }
            }
          }
        
      })
    })
    this.setState({
      result:result,
      has_mistakes: result===10? false:true,
      done:true
    })
  }

  

 arraysEqual =(_arr1, _arr2)=> {

  if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
    return false;

  var arr1 = _arr1.concat().sort();
  var arr2 = _arr2.concat().sort();

  for (var i = 0; i < arr1.length; i++) {

      if (arr1[i] !== arr2[i])
          return false;

  }

  return true;

}
  render_complete=set=>{
    let has_mistakes=this.state.has_mistakes
    return set.map((question,i)=>(
      <div className="answer is-flex aic mar-bot-20">
        <p className="question-text mar-left-10">{question.text}</p>
        <TextInput
          type="text"
          disabled={ has_mistakes}
          onChange={(e)=>{
            let questions=this.state.questions
            questions[4].set[i].answer=e.target.value
            this.setState({
              questions:questions
            })
            console.log(this.state.questions)
          }}
          placeholder={this.state.has_mistakes? question.answer_id:null}

        />
      </div>
    ))
  }
  render_lessions=()=>{
    let index=0
    let {lessons, lession_css}=this.state;
    let rendered_lessions=[]
    lessons.map((lession ,i)=>{
      rendered_lessions.push(      
        <a>
          <div className={`side-entry is-flex aic ${lession_css[index]}`}>
          <p className="lession-number">درس {lession.number}</p>
          <p className="lession-title">{lession.title}</p>
        </div>
        </a>
      )
      index=index>=lession_css.lenth? 0:index++
      console.log(index>=lession_css.lenth? 0:index++)
    })
    return rendered_lessions
  }
  change_lession_color=(color_index,lession_css)=>{
      return color_index>=lession_css.lenth? 0:color_index++
  }


  render(){
    const {isPlaying, volume} = this.state
    return (
      <div className="container">
        <div className="header">
          <div className="columns is-mobile">
            <div className="column is-2">
              <img className="header-logo" src={require("./assets/logo.png")}/>
            </div>
            <div className="column is-4 is-flex aic">
              <input className="search-input" placeholder="بحث"/>
            </div>
            <div className="column is-6 is-hidden-mobile">
              <div className="columns">
                <div className="column pad-top-33 is-3 is-flex aic">
                  <div className="header-button">
                    <a>صفحه رئيسيه</a>
                  </div>
                </div>
                <div className="column pad-top-33 is-3 is-flex aic">
                  <div className="header-button">
                    <a>المدرسين</a>
                  </div>
                </div>
                <div className="column pad-top-33 is-3 is-flex aic">
                  <div className="header-button">
                    <a>المواد</a>
                  </div>
                </div>
                <div className="column pad-top-33 is-3 is-flex aic">
                  <div className="header-button">
                    <a>اتصل بنا</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={require("./assets/header-decor.png")}/>
        <div className="is-flex aic">
          <img className="header-logo" src={require("./assets/logo.png")}/>
          <h1 className="section-title">الدرس</h1>
        </div>
        <div className="columns">
            <div className="column is-9 pad-top-33">
            {/* <ReactAwesomePlayer
              options={this.state.options}
            /> */}
            {/* <VideoPlayer
              url="https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4"
              isPlaying={isPlaying}
              volume={volume}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onVolume={this.handleVolume}
            
            /> */}
            {/* <Plyr
              type="youtube" // or "vimeo"
              videoId="CDFN1VatiJA"
            /> */}
            <Player>
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </Player>
            </div>
            <div className="column is-3 is-hidden-mobile">
              {this.render_lessions()}
            </div>
        </div>
        <div className="line-seperator"/>
        <div className="is-flex aic">
          <img className="header-logo" src={require("./assets/logo.png")}/>
          <h1 className="section-title">الاسئله</h1>
        </div>
        {
          !this.state.done?
            <div>
              <div className="columns is-multiline ">
                {this.draw_question_div()}
              </div>
              <div className="is-flex aic jcc mar-bot-20">
                <div className="submit-div">
                  <button onClick={()=>this.calculate_result()} className="submit-button">
                    انتهت الاساله
                  </button>
                </div>
              </div>
            </div>:
            <div>
              <div className="is-flex aic jcc mar-bot-20">
                <div className="submit-div">
                  {this.state.result}/10
                </div>
              </div>
              {
                this.state.has_mistakes?
                <div className="columns is-multiline ">
                  {this.draw_question_div()}
                </div>:
                <img src={require("./assets/right.png")}/>
              }
            </div>
        }
        {/*footer*/}
        <div className="footer">
          <div className="columns is-mobile">
            <div className="column is-2-desktop is-4-mobile ">
              <img className="header-logo" src={require("./assets/logo.png")}/>
            </div>
            <div className="column is-2-desktop is-4-mobile is-flex flex-column">
              <p className="footer-text"> صفحات</p>
              <a className="footer-link">صفحه الرئيسيه</a>
              <a className="footer-link">المدرسين</a>
              <a className="footer-link">المواد</a>
              <a className="footer-link">اتصل بنا</a>
            </div>
          </div>
          <div className="is-flex aic jcc ">
          <p className=" f-18 footer-text "> جميع الحقوق محفوظه</p>
          </div>
        </div>
      </div>
    );
  
  }
}

export default App;
