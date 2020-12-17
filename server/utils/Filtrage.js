
function AgeCroissant(a, b) {
    if (a.age < b.age) return -1;
    if (a.age > b.age) return 1;
    return 0;
}

function AgeDecroissant(a, b) {
    if (a.age > b.age) return -1;
    if (a.age < b.age) return 1;
    return 0;
}

function DistanceCroissant(a, b) {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  }
  function DistanceDecroissant(a, b) {
    if (a.distance > b.distance) return -1;
    if (a.distance < b.distance) return 1;
    return 0;
  }

  function FameCroissant(a, b) {
    if (a.popularity < b.popularity) return -1;
    if (a.popularity > b.popularity) return 1;
    return 0;
  }
  function FameDecroissant(a, b) {
    if (a.popularity > b.popularity) return -1;
    if (a.popularity < b.popularity) return 1;
    return 0;
  }

  function InterestCroissant(a, b) {
    if (a.cntinterests < b.cntinterests) return -1;
    if (a.cntinterests > b.cntinterests) return 1;
    return 0;
  }
  function InterestDecroissant(a, b) {
    if (a.cntinterests > b.cntinterests) return -1;
    if (a.cntinterests < b.cntinterests) return 1;
    return 0;
  }

  module.exports = {
    AgeCroissant,
    AgeDecroissant,
    DistanceCroissant,
    DistanceDecroissant,
    FameCroissant,
    FameDecroissant,
    InterestCroissant,
    InterestDecroissant
  }