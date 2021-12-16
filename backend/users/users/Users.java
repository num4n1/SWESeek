package com.example.demo.users;

import javax.persistence.*;

@Entity
@Table
public class Users
{
    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private long Userid;
    private String email;
    private String UserName;
    private String Password;
    private String FName;
    private String LName;
    private String PhoneNumber;

    public Users() {
    }

    public Users(long userid, String email, String userName, String password, String FName, String LName, String phoneNumber) {
        Userid = userid;
        this.email = email;
        UserName = userName;
        Password = password;
        this.FName = FName;
        this.LName = LName;
        PhoneNumber = phoneNumber;
    }

    public Users(String email, String userName, String password, String FName, String LName, String phoneNumber) {
        this.email = email;
        UserName = userName;
        Password = password;
        this.FName = FName;
        this.LName = LName;
        PhoneNumber = phoneNumber;
    }

    public long getUserid() {
        return Userid;
    }

    public void setUserid(long userid) {
        Userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getFName() {
        return FName;
    }

    public void setFName(String FName) {
        this.FName = FName;
    }

    public String getLName() {
        return LName;
    }

    public void setLName(String LName) {
        this.LName = LName;
    }

    public String getPhoneNumber() {
        return PhoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "Users{" +
                "Userid=" + Userid +
                ", email='" + email + '\'' +
                ", UserName='" + UserName + '\'' +
                ", Password='" + Password + '\'' +
                ", FName='" + FName + '\'' +
                ", LName='" + LName + '\'' +
                ", PhoneNumber='" + PhoneNumber + '\'' +
                '}';
    }
}

