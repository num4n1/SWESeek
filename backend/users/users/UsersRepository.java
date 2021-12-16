package com.example.demo.users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
 interface UsersRepository extends JpaRepository<Users,Long>
{
    @Query("SELECT u FROM Users u WHERE u.UserName=?1")
    Optional<Users> findUsersByUserName(String userName);
}