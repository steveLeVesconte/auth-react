
import nonEdge from '../../assets/intersection.png'
import leftSide from '../../assets/leftside.png'
import rightSide from '../../assets/rightside.png'

import upperLeft from '../../assets/upperLeft.png'
import upperRight from '../../assets/upperRight.png'
import top from '../../assets/top.png'
//import leftSide from '../../assets/leftside.png'
import bottomLeft from '../../assets/lowerLeft.png'
import bottomRight from '../../assets/lowerRight.png'
import bottom from '../../assets/bottom.png'
import blackStone from '../../assets/blackStoneTrans.png'
import whiteStone from '../../assets/whiteStoneTrans.png'


import {  Box, Image, Show } from '@chakra-ui/react';

interface Props {

    row:number;
    col:number;
    content:string;
    // 👇️ turn off type checking
   // playerId: (params: string) => void;
  }

const handlePlay=(row:number,col:number)=>{
    console.log("intersection click: ",row.toString() + '-' + col)
}

const IntersectionBackGround = (props:Props) => {
    const x=getIntersctionImage(props.row, props.col);
    console.log('BG - intersection: ',props)
    console.log('image: ',getIntersctionImage(props.row, props.col));

    let stoneImage =blackStone;

    if(props.content=='w') stoneImage=whiteStone;

    if(props.content !== 'b' && props.content !== 'w') return (<>
<Image onClick={()=>handlePlay(props.row,props.col)} className='image1' src={x}/> 
</>
    );

return(
<div className='parent'>
    <Image onClick={()=>handlePlay(props.row,props.col)}  className='image1' src={x}/> 

    <Image  className='image2' src={stoneImage}/> 

  </div>

);

     



    // if(props.row==0)
    // {
    //     if(props.col==0){
    //     return (    <div>
    //         <Image src={upperLeft}/>
    //     </div>);
    //     }
    //     if(props.col==18){
    //         return (    <div>
    //             <Image src={upperRight}/>
    //         </div>);
    //     }
    
    //         return (    <div>
    //             <Image src={top}/>
    //         </div>);
        
    // }
 
    // if(props.row==18)
    // {
    //     if(props.col==0){
    //     return (    <div>
    //         <Image src={bottomLeft}/>
    //     </div>);
    //     }
    //     if(props.col==18){
    //         return (    <div>
    //             <Image src={bottomRight}/>
    //         </div>);
    //     }
    
    //         return (    <div>
    //             <Image src={bottom}/>
    //         </div>);
        
    // }

    // if(props.col==0){
    //     return   <div>
    //     <Image src={leftSide}/>
    // </div>
    // }
    // else{
    //     return   <div>
    //     <Image src={rightSide}/>
    // </div>
    // }

}

function getIntersctionImage(row:number, col:number):any  {

    // import nonEdge from '../../assets/intersection.png'
    // import leftSide from '../../assets/leftside.png'
    // import rightSide from '../../assets/rightside.png'
    
    // import upperLeft from '../../assets/upperLeft.png'
    // import upperRight from '../../assets/upperRight.png'
    // import top from '../../assets/top.png'
    // //import leftSide from '../../assets/leftside.png'
    // import bottomLeft from '../../assets/lowerLeft.png'
    // import bottomRight from '../../assets/lowerRight.png'
    // import bottom from '../../assets/bottom.png'



    if((row>0) && (row<18)  && (col>0) && (col<18)) 
    {return nonEdge;
}
     



    if(row===0)
    {
        if(col===0){
        return upperLeft;
        }
        if(col===18){
            return upperRight;
            
        }
    
        return top;
        
    }
 
    if(row===18)
    {
        if(col===0){
        return bottomLeft;
        }
        if(col===18){
            return  bottomRight;
        }
    
        return bottom;
        
    }

    if(col===0){
        return  leftSide;
    }
    else{
        return rightSide;
    }

}

export default IntersectionBackGround