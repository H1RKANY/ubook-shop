import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css';
import WindowFloat from '../Libs/WindowFloat';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "خوش آمدید"



  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x/>

      {state.form=="book specs"?<WindowFloat title="مشخصات کتاب" onclose={()=>{
        delete state.form
        refresh()
      }}>h<pre>{JSON.stringify(state.book,null,2)}</pre>
      </WindowFloat>:null}

      <br-x />
      <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        

          <c-c>
          <w-cse style={{gap:5 , padding:5}} >
            
            {
              props.books.map(book =>{
                return <c-x style={{backgroundColor:"white",borderBottomRightRadius:5,WebkitBorderBottomLeftRadius:5}} >
                <img 
                className={global.styles.hover} 
                src = {book.imageLink} 
                style={{height:200,width:150,flex:1,objectFit:"fill",minWidth:150,borderTopLeftRadius:10,borderTopRightRadius:10}}
                onClick={()=>{
                  state.form="bookspecs"
                  refresh()
                }}/>

                <f-cc style={{width:"%100",fontFamily:"gx",fontSize:12}} >
                {book.title}  
                </f-cc>

                <f-csb style={{width:"%100"}}>
                  <c-cc>
                    <f-13b>{book.price*0.8}</f-13b>
                    <del>{book.price}</del>
                    <img src='public\shopping-basket_1586417.png' style={{objectFit:"contain",width:20,height:20}}/>
                  </c-cc>

                </f-csb>

                </c-x>
                
              })}

          </w-cse>
          </c-c>

      </Window>


    </div>
    
  
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
    
    let books=await global.db.collection("books").find({}).toArray()
    for(let book of books)
    {
      book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
    }
    console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}