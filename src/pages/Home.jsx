import styles from "./Home.module.css";
import TextButton from "../components/TextButton";
import { useEffect, useState, useRef } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const audioRef = useRef(null);
  const TYPEIMGURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/";
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokeData, setPokeData] = useState({});
  const [pokemonCry, setPokemonCry] = useState();
  const { fetchApiData, loading, error } = useFetchData();
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [pkmInterval, setPkmInterval] = useState({
    totalPokemons: 151,
    initial: 0,
  });
  const [update, setUpdate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      //   await setPkmInterval();
      let newContent = await fetchApiData(
        `https://pokeapi.co/api/v2/pokemon?limit=${pkmInterval["totalPokemons"]}&offset=${pkmInterval["initial"]}`
      );
      setAllPokemons(newContent.results);
    };

    fetchPokemons();
  }, [pkmInterval]);

  const getPokemonData = async (object) => {
    return await fetchApiData(object.url);
  };

  useEffect(() => {
    const fetchPokeData = async () => {
      const data = {};
      for (const pokemon of allPokemons) {
        const fetchedData = await getPokemonData(pokemon);
        data[pokemon.name] = fetchedData; // Armazena os dados usando o nome como chave
        data[pokemon.name]["shiny"] = false;
      }
      setPokeData(data);
    };

    fetchPokeData();
  }, [allPokemons]);

  const setPokemonInterval = (gen) => {
    switch (gen) {
      case 0:
        console.log("zero");
        setPkmInterval({
          totalPokemons: 151,
          initial: 0,
        });
        break;
      case 1:
        console.log("um");
        setPkmInterval({
          totalPokemons: 100,
          initial: 151,
        });
        break;
      case 2:
        setPkmInterval({
          totalPokemons: 135,
          initial: 251,
        });
        break;
      case 3:
        setPkmInterval({
          totalPokemons: 107,
          initial: 386,
        });
        break;
      case 4:
        setPkmInterval({
          totalPokemons: 155,
          initial: 493,
        });
        break;
      case 5:
        setPkmInterval({
          totalPokemons: 71,
          initial: 649,
        });
        break;
      case 6:
        setPkmInterval({
          totalPokemons: 86,
          initial: 721,
        });
        break;
      case 7:
        setPkmInterval({
          totalPokemons: 95,
          initial: 809,
        });
        break;
      case 8:
        setPkmInterval({
          totalPokemons: 119,
          initial: 905,
        });
        break;
      default:
        console.log("outro");
        setPkmInterval({
          totalPokemons: 151,
          initial: 0,
        });
        break;
    }
  };

  const handlePokemonClick = async (object) => {
    const pokeCry = pokeData[object.name];
    setPokemonCry(pokeCry);
    if (audioRef.current && pokeCry) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div
      className={styles.main_container + " container-12 m-2 p-2 roboto-regular"}
    >
      <div className="row-12 text-center">
        <div className="col-sm-12 d-inline-block mb-2">
          <p className={styles.title + " m-2"}>Pokedex</p>
          <p className={styles.subtitle + " m-2"}>
            Aqui você pode ver os dados de todos os Pokemon!
          </p>
        </div>
        <div className="row-lg-12 row-md-6 d-flex justify-content-between">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className={styles.radio_option} key={index}>
              <input
                type="radio"
                value={false}
                checked={selectedRadio == index}
                onChange={(e) => {
                  setSelectedRadio(index);
                  setPokemonInterval(index);
                }}
                id={`radio-${index}`}
              />
              <label htmlFor={`radio-${index}`} className={styles.label}>
                Gen {index + 1}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.list_container + " container-fluid"}>
          <div className="row gap-0 p-2">
            {loading && (
              <div>
                <div className="container-fluid my-2">
                  <img
                    src="https://i.redd.it/fcys3yr59dax.gif"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                Carregando...
              </div>
            )}
            {allPokemons &&
              !loading &&
              allPokemons.map((pokemon, index) => {
                const pokemonData = pokeData[pokemon.name]; // Dados específicos do Pokémon
                if (!pokemonData) {
                  return null; // Não renderiza até os dados estarem disponíveis
                }

                return (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2"
                    onClick={(e) => {
                      navigate("/pkmData", { state: pokemonData });
                    }}
                    key={index}
                  >
                    <div
                      className={`${styles.card_container} px-0`}
                      style={{
                        "--type-color": `var(--type-${pokemonData.types[0]?.type?.name})`,
                        "--type-color2": `var(--type-${
                          pokemonData.types[1]
                            ? pokemonData.types[1]?.type?.name
                            : pokemonData.types[0]?.type?.name
                        })`,
                      }}
                    >
                      <div className="row d-flex px-2">
                        <div className={`col-6 py-2 ${styles.img_pokemon}`} />
                        <div className={`col-6 py-2 ${styles.img_pokemon2}`} />
                        <div className={styles.pkm_img}>
                          <img
                            className={styles.img_shadow}
                            src={
                              pokemonData["shiny"]
                                ? pokemonData.sprites.front_shiny
                                : pokemonData.sprites.front_default ??
                                  "https://static.thenounproject.com/png/594337-200.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className={styles.shiny_icon}>
                          <i
                            className="bi bi-stars"
                            onClick={(e) => {
                              e.stopPropagation();
                              pokemonData["shiny"] = !pokemonData["shiny"];
                              setUpdate(!update);
                            }}
                          ></i>
                        </div>
                        <div className={styles.sound_icon}>
                          <i
                            className="bi bi-volume-up-fill"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePokemonClick(pokemon);
                            }}
                          ></i>
                        </div>
                      </div>
                      <div className="col my-2">
                        <div className="d-flex justify-content-between mx-2">
                          <p className="m-0">{`#${pokemonData.id}`}</p>
                          <img
                            className={styles.type_img}
                            src={`${
                              TYPEIMGURL +
                              String(pokemonData.types[0].type.url)
                                .slice(31)
                                .replaceAll("/", "")
                            }.png`}
                            alt=""
                          />
                        </div>
                        <div className="d-flex justify-content-between mx-2">
                          <p className="m-0">
                            {capitalizeFirstLetter(pokemon.name)}
                          </p>
                          {pokemonData.types[1] && (
                            <img
                              className={styles.type_img}
                              src={`${
                                TYPEIMGURL +
                                String(pokemonData.types[1].type.url)
                                  .slice(31)
                                  .replaceAll("/", "")
                              }.png`}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <audio
                        controls
                        ref={audioRef}
                        style={{ display: "none" }}
                      >
                        <source
                          src={pokemonCry ? pokemonCry.cries.latest : null}
                          type="audio/ogg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* <TextButton text={"Pokedex"} /> */}
      </div>
    </div>
  );
};

export default Home;
