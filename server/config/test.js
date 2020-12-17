const selectMatch = async (user) => {
    `SELECT count(*) AS cntinterests, b.*
      from user_tag a INNER JOIN user b ON b.id = a.user_id
      WHERE a.tag_id IN (SELECT tag_id FROM user_tag WHERE user_id = 54) 
      AND a.user_id != 54
      AND b.gender != 'Homme'
      AND b.orientation != 'homo'
      GROUP BY a.id
      ORDER BY cntinterests DESC`
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

  /*
  function checkUserLike($post_id, $user_id)
{
    global $conn;
    $queryCheckUserLike = "SELECT status FROM post_like WHERE post_id = :post_id AND like_user_id = :like_user_id";
    $stmt = $conn->prepare($queryCheckUserLike);
    $result = $stmt->execute(array(
        'post_id'       => $post_id,
        'like_user_id'  => $user_id
    ));
    if($result)
    {
        $count = $stmt->rowCount();
        return $count;
    }

}
*/