import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../../components/navbar/Navbar';
import Search from '../../assets/Search.svg';
import Test from '../../components/tableItem/Test';

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [sites, setSites] = useState([]);
  const [sortByColumn, setSortByColumn] = useState([true, false, false, false, false]);
  const [nameOfColumn, setNameOfColumn] = useState("");
  const [query, setQuery] = useState("");

  const statusSortObj = {
    ONLINE: 1,
    PAUSED: 2,
    STOPPED: 3,
    DRAFT: 4
  };

  const upperCaseFirstLetter = string =>
 `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

  const lowerCaseAllWordsExceptFirstLetters = string =>
  string.replaceAll(/\S*/g, word =>
    `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
  );

  const handleInput = (e) => {
    setQuery(e.target.value);
  };
  const setSortByColumnArr = (sortId, nameOfColumn) => {
    let newArr = sortByColumn.map((item, index) => index === sortId ? !item : false);
    setSortByColumn(newArr);
    setNameOfColumn(nameOfColumn);
  };

  const getSortedTests = (data) => {
    let sortIndex = sortByColumn.findIndex(item => item === true);
    let newArr = [];
    if (sortByColumn[sortIndex] && nameOfColumn === "") {
      newArr = data.sort((a, b) => a.id > b.id ? 1 : -1);
      setTests(newArr);
    } else if (sortByColumn[sortIndex] && nameOfColumn === "name") {
      newArr = data.sort((a, b) => a.name > b.name ? 1 : -1);
      setTests(newArr);
    } else if (!sortByColumn[sortIndex] && nameOfColumn === "name") {
      newArr = data.sort((a, b) => a.name < b.name ? 1 : -1);
      setTests(newArr);
    } else if (sortByColumn[sortIndex] && nameOfColumn === 'type') {
      newArr = data.sort((a, b) => a.type > b.type ? 1 : -1);
      setTests(newArr);
    } else if (!sortByColumn[sortIndex] && nameOfColumn === "type") {
      newArr = data.sort((a, b) => a.type < b.type ? 1 : -1);
      setTests(newArr);
    } else if (sortByColumn[sortIndex] && nameOfColumn === 'site') {
      newArr = data.sort((a, b) => a.siteId < b.siteId ? 1 : -1);
      setTests(newArr);
    } else if (!sortByColumn[sortIndex] && nameOfColumn === "site") {
      newArr = data.sort((a, b) => a.siteId > b.siteId ? 1 : -1);
      setTests(newArr);
    } else if (sortByColumn[sortIndex] && nameOfColumn === "status") {
      newArr = data.sort((a ,b) => statusSortObj[`${a.status}`] > statusSortObj[`${b.status}`] ? 1 : -1);
      setTests(newArr);
    } else if (!sortByColumn[sortIndex] && nameOfColumn === "status") {
      newArr = data.sort((a, b) => statusSortObj[`${a.status}`] < statusSortObj[`${b.status}`] ? 1 : -1);
      setTests(newArr);
    }
    return newArr;
  };

  const setFilterByName = (data) => {
    let newArr1 = data?.filter(item => item?.name.toLowerCase().includes(query.toLowerCase()) ? item : "");
    setTests(newArr1);
  };

  const loadSites = async() => {
    const response = await axios.get(`http://localhost:3100/sites`);
    const data = await response.data
    let newArr = data?.map(item => ({...item,
      url: item.url.replace("https://www.", "").replace("https://", "").replace("http://", "").trim()
    }));
    setSites(newArr);
  }

  const loadTests = async() => {
    const response = await axios.get(`http://localhost:3100/tests`);
    const data = await response.data;
    let newArr = data.map(item => ({
      ...item, 
      status: upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(item.status)),
      type: item.type !== 'MVT' ? upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(item.type)) : item.type
    }))
    // upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(input))
    let newArr1 = getSortedTests(newArr);
    setFilterByName(newArr1);
  };

  const getSiteUrl = (siteId) => {
    return sites?.find(elem => elem.id === siteId).url;
  };
 
  useEffect(() => {
    loadSites();
    loadTests();
    console.log(tests)
    // eslint-disable-next-line
  },[sortByColumn, query]);

  return (
    <div className='container'>
      {/* TITLE */}
      <Navbar title={"Dashboard"}/>

      {/* SEARCH */}
      <div className='testSearch'>
        <div className='imgWrapper'>
          <img src={Search} alt="Search" />
        </div>
        <input 
          type="text" 
          className='testInput' placeholder='What test are you looking for?'
          onChange={handleInput}
          value={query}
          name="search" 
          id="search"
        />
        <div className='counter'>{tests.length} tests</div>
      </div>

      {/* TABLE */}
      {tests.length !== 0 &&
      <table className='testsTable'>
        <thead>
          <tr className='testTableHeader'>
            <th className='testImg'></th>
            <th className='testName' onClick={()=> setSortByColumnArr(1, "name")}>Name</th>
            <th className='testType' onClick={()=> setSortByColumnArr(2, "type")}>Type</th>
            <th className='testStatus' onClick={()=> setSortByColumnArr(3, "status")}>Status</th>
            <th className='testSite' onClick={()=> setSortByColumnArr(4, "site")}>Site</th>
            <th className='testActions'></th>
          </tr>
        </thead>
        <tbody>
          {tests?.map((test) => (
            <Test key={test.id} test={test} getSiteUrl={getSiteUrl}/>
          ))}
        </tbody>
      </table>
      }


      {/* MESSAGE */}
      {tests.length === 0 &&
      <div className='messageWrapper'>
        <div className='messageTitle'>Your search did not match any results.</div>
        <button 
          className='messageButton'
          onClick={() => setQuery("")}
        >
          Reset
        </button>
      </div>
      }
    </div>
  )
}

export default Dashboard;