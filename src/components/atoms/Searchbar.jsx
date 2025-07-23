export default function SearchBar({placeholder}) {
    return (
      
      <div className="flex w-85 h-11 m-5 items-center row px-4 py-2 rounded-full bg-zinc-800 text-sm placeholder-stone-200 focus:outline-none focus:ring-2">
        <img src="../src/assets/images/search.svg" alt="Soundle logo" className="w-5 h-5 mr-2" />
        
        <input type="text" placeholder={placeholder}/>

      </div>
    );
  }
  