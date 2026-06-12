// Curated direct image URLs (Wikimedia Commons upload paths).
// These load instantly without the slow Wikimedia search API.
// Keys match the `query` fields used across data files & components.

const W = (path: string, width = 1000) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${width}px-${path.split("/").pop()}`;

export const STATIC_IMAGES: Record<string, string[]> = {
  // ───── Hero / general ─────
  "Dome of the Rock Jerusalem": [
    W("a/ac/Dome_of_the_Rock%2C_Jerusalem_4.jpg", 1600),
    W("0/0d/Jerusalem-2013%282%29-Aerial-Temple_Mount-%28south_exposure%29.jpg", 1600),
  ],
  Palestine: [
    W("0/00/Flag_of_Palestine.svg", 1200),
    W("a/ac/Dome_of_the_Rock%2C_Jerusalem_4.jpg", 1200),
    W("3/3e/Jerusalem_Dome_of_the_rock_BW_14.JPG", 1200),
    W("5/5a/Bethlehem_BW_2010-12-12_07-29-15.JPG", 1200),
    W("6/6e/Acre_BW_5.JPG", 1200),
    W("8/89/Caesarea_maritima_%28DerHexer%29_2011-08-02_098.jpg", 1200),
  ],
  "Palestine historical": [
    W("e/ee/Bethlehem-1880.jpg", 1200),
    W("0/02/Jerusalem_from_Mount_Olives_circa_1910.jpg", 1200),
    W("8/8f/Jaffa_1930s.jpg", 1200),
    W("d/d0/Old_Jaffa_BW_1.JPG", 1200),
    W("3/3a/Palestinian_woman%2C_around_1900.jpg", 1200),
    W("1/1e/Jerusalem_Damascus_Gate_BW_1.JPG", 1200),
  ],
  "Palestine landscape": [
    W("8/89/Caesarea_maritima_%28DerHexer%29_2011-08-02_098.jpg", 1200),
    W("4/4b/Wadi_Qelt_Israel.jpg", 1200),
    W("c/c5/Dead_Sea_by_David_Shankbone.jpg", 1200),
  ],

  // ───── Timeline / events ─────
  "Ottoman Palestine": [W("6/6f/Jerusalem_Tower_of_David_BW_1.JPG", 1200)],
  "Balfour Declaration": [W("8/8f/Balfour_declaration_unmarked.jpg", 1200)],
  "British Mandate Palestine": [W("8/8f/Jaffa_1930s.jpg", 1200)],
  "1948 Palestinian exodus": [W("9/92/Palestinian_refugees.jpg", 1200)],
  "1948 Palestine": [W("9/92/Palestinian_refugees.jpg", 1200)],
  "Six-Day War": [W("8/82/Six_Day_War_Territories.svg", 1200)],
  "First Intifada": [W("2/2a/First_Intifada_in_Gaza_Strip%2C_1987.jpg", 1200)],
  "Oslo Accords": [W("e/ec/Bill_Clinton%2C_Yitzhak_Rabin%2C_Yasser_Arafat_at_the_White_House_1993-09-13.jpg", 1200)],
  "Second Intifada": [W("8/8f/Jaffa_1930s.jpg", 1200)],
  "Palestine culture today": [W("c/c1/Palestinian_embroidery_-_close-up.jpg", 1200)],

  // ───── Figures ─────
  "Mahmoud Darwish": [W("7/70/Mahmoud_Darwish_1.JPG", 800)],
  "Ghassan Kanafani": [W("c/c8/Ghassan_Kanafani.jpg", 800)],
  "Fadwa Tuqan": [W("0/02/Fadwa_Tuqan_2.jpg", 800)],
  "Edward Said": [W("2/2f/Edward_Said.jpg", 800)],
  "Sliman Mansour": [W("c/c1/Palestinian_embroidery_-_close-up.jpg", 800)],
  "Leila Khaled": [W("3/32/Leila_Khaled_1969.jpg", 800)],

  // ───── Cities ─────
  "Jerusalem Old City": [W("a/ac/Dome_of_the_Rock%2C_Jerusalem_4.jpg", 1200)],
  "Jerusalem old city": [W("a/ac/Dome_of_the_Rock%2C_Jerusalem_4.jpg", 1200), W("1/1e/Jerusalem_Damascus_Gate_BW_1.JPG", 1200)],
  "Gaza city": [W("4/4d/Gaza_beach_2.jpg", 1200)],
  "Haifa city": [W("d/d2/Haifa_BW_1.JPG", 1200)],
  "Jaffa Old City": [W("d/d0/Old_Jaffa_BW_1.JPG", 1200)],
  "Nablus old city": [W("a/ab/Nablus_old_city.jpg", 1200)],
  "Bethlehem Church of the Nativity": [W("5/5a/Bethlehem_BW_2010-12-12_07-29-15.JPG", 1200)],
  "Hebron Ibrahimi Mosque": [W("9/9f/Ibrahimi_Mosque_in_Hebron.jpg", 1200)],
  "Acre old city": [W("6/6e/Acre_BW_5.JPG", 1200)],
  Ramallah: [W("b/b9/Ramallah_City.jpg", 1200)],
  Tiberias: [W("0/06/Tiberias_BW_1.JPG", 1200)],

  // ───── Culture ─────
  Musakhan: [W("c/c6/Musakhan_-_Palestinian_chicken_dish.jpg", 1000)],
  Maqluba: [W("3/3d/Maqluba.jpg", 1000)],
  "Knafeh Nabulsieh": [W("f/f7/Knafeh.jpg", 1000)],
  "Palestinian thobe": [W("c/c1/Palestinian_embroidery_-_close-up.jpg", 1000)],
  Keffiyeh: [W("2/24/Keffiyeh.jpg", 1000)],
  "Palestinian tatreez embroidery": [W("c/c1/Palestinian_embroidery_-_close-up.jpg", 1000)],
  Dabke: [W("8/80/Dabke_dance.jpg", 1000)],
  "Palestinian culture": [
    W("c/c1/Palestinian_embroidery_-_close-up.jpg", 1000),
    W("c/c6/Musakhan_-_Palestinian_chicken_dish.jpg", 1000),
    W("3/3d/Maqluba.jpg", 1000),
    W("f/f7/Knafeh.jpg", 1000),
    W("2/24/Keffiyeh.jpg", 1000),
    W("8/80/Dabke_dance.jpg", 1000),
  ],
  "Palestinian art": [
    W("c/c1/Palestinian_embroidery_-_close-up.jpg", 1000),
    W("a/ac/Dome_of_the_Rock%2C_Jerusalem_4.jpg", 1000),
  ],
};

export function getStaticImage(query: string): string | null {
  const arr = STATIC_IMAGES[query];
  return arr && arr.length ? arr[0] : null;
}

export function getStaticImages(query: string): string[] {
  return STATIC_IMAGES[query] ?? [];
}
