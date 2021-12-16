package com.example.demo.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/user")
public class UsersController
{
    private final UsersService usersService;

    @Autowired
    private UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> getUsers()
    {
        return usersService.getUsers();
    }

    @PostMapping
    public void registerNewUser(@RequestBody Users user)
    {
        usersService.addNewUser(user);
    }

    @DeleteMapping(path = "{UserId}")
    public void deleteUser(@PathVariable("UserId") Long Userid)
    {
        usersService.deleteUser(Userid);
    }

    @PutMapping(path = "{UserId}")
    public void updateUser(
            @PathVariable("UserId") Long userId,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String fName,
            @RequestParam(required = false) String lName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false) String password)
    {
        usersService.updateUser( userId, email, fName ,lName, phoneNumber, userName,  password);
    }
}