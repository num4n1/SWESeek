package com.example.demo.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository UsersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.UsersRepository = usersRepository;
    }

    public List<Users> getUsers() {
        return UsersRepository.findAll();
    }


    public void addNewUser(Users user) {
        Optional<Users> UserOptional = UsersRepository.findUsersByUserName(user.getUserName());
        if (UserOptional.isPresent()) {
            throw new IllegalStateException("Username taken!");
        }
        UsersRepository.save(user);
    }

    public void deleteUser(Long userid) {
        boolean exists = UsersRepository.existsById(userid);
        if (!exists) {
            throw new IllegalStateException("User with id: " + userid + " does not exists");
        }
        UsersRepository.deleteById(userid);

    }

    @Transactional
    public void updateUser(Long userId, String userName, String password, String fName, String mName, String lName, String phoneNumber) {
        Users user = UsersRepository.findById(userId).orElseThrow(() -> new IllegalStateException("student with " + userId + " does not exist."));

        if (userName != null && userName.length() > 0 && !Objects.equals(user.getUserName(), userName)) {
            user.setUserName(userName);
        }

        if (userName != null && userName.length() > 0 && !Objects.equals(user.getUserName(), userName)) {
            Optional<Users> userOptional = UsersRepository.findUsersByUserName(userName);
            if (userOptional.isPresent()) {
                throw new IllegalStateException("UserName is already taken");
            }
            user.setUserName(userName);
        }

    }
}