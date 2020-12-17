const selectMatch = async (user) => {
    const promise = new Promise((resolve, reject) => {
      if (user.orientation === "hetero") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}' 
        AND b.gender != '${user.gender}'
        AND b.orientation != 'homo'
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else if (user.orientation === "homo") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}' 
        AND b.gender = '${user.gender}'
        AND b.orientation != 'hetero'
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else if (user.orientation === "bi") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}'
        AND ((b.gender = '${user.gender}' AND b.orientation != 'hetero') 
        OR (b.gender != '${user.gender}' AND  b.orientation != 'homo'))  
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      }
    });
    return promise;
  };

  const selectMatch = async (user) => {
    const promise = new Promise((resolve, reject) => {
      if (user.orientation === "hetero") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}' 
        AND b.gender != '${user.gender}'
        AND b.orientation != 'homo'
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else if (user.orientation === "homo") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}' 
        AND b.gender = '${user.gender}'
        AND b.orientation != 'hetero'
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      } else if (user.orientation === "bi") {
        const query_if_interests = `SELECT count() AS cntinterests, b.
        from user_interests a INNER JOIN users b ON b.iduser = a.iduser
        WHERE a.interest IN (SELECT interest FROM user_interests WHERE iduser = '${user.iduser}') 
        AND a.iduser != '${user.iduser}'
        AND ((b.gender = '${user.gender}' AND b.orientation != 'hetero') 
        OR (b.gender != '${user.gender}' AND  b.orientation != 'homo'))  
        GROUP BY a.iduser
        ORDER BY cntinterests DESC`;
        connection.query(query_if_interests, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      }
    });
    return promise;
  };