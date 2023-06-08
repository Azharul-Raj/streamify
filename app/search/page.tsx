import getSongByTitle from "@/action/getSongByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps{
  searchParams:{
    title:string;
  }
}

const Search=async({searchParams}:SearchProps)=>{

  const songs= await getSongByTitle(searchParams?.title)

  return(
      <div className="bg-neutral-900 overflow-hidden overflow-y-hidden w-full h-full rounded-lg">
        <Header className="from-bg-neutral-900">
          <div className="flex flex-col mb-2 gap-y-6">
            <h1 className="text-white text-xl font-semibold">Search</h1>
            <SearchInput/>
          </div>
        </Header>
        <SearchContent songs={songs}/>
      </div>
  )
}
export default Search;