export default function Paged(props) { 
    const { videoGamesPP, allVideoGames,paged} = props 

    let pageNumbers = []
    
    for (let i = 1 ; i < Math.ceil(allVideoGames / videoGamesPP); i++) { 
        pageNumbers.push(i)
    }


    return( 
        <nav>
            <ul>
            {pageNumbers && pageNumbers.map(n => (
            <button key={n} className='btn' onClick={() => paged(n)}>{n}</button>
        ))}
            </ul>
        </nav>
    )


}