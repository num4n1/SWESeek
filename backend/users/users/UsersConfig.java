package com.example.demo.users;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class UsersConfig
{
    @Bean
    CommandLineRunner commandLineRunnerForUsers(UsersRepository usersRepository)
    {
        return args->
        {
            Users zeeshan = new Users("Zeeshan1234@gmail","zeeshan9","iamstupid","zeeshan","Chougle","152635213");

            Users numan = new Users("Numan1234@gmail","num4n","king1234","mohamed","numan","12653615");

            usersRepository.saveAll(List.of(zeeshan,numan));
        };
    }
}
