import { useRef, useState, Fragment, useEffect } from 'react';
import { BiTrash, BiReset, BiEditAlt } from 'react-icons/bi';
import { BsPersonFillAdd } from 'react-icons/bs';
import { HiOutlineUserRemove } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { CgRemove } from 'react-icons/cg';
import classes from '../../Ui/Global.module.css';
import './style.css';

const Display = () => {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState(0);
    const [searchUserName, setSearchUserName] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [, setImageFile] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    const addUserName = useRef();
    const userEmail = useRef();
    const userPhone = useRef();
    const userImageInput = useRef();

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
            setId(JSON.parse(storedUsers.length));
        }
    }, []);

    const handleImageUpload = event => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setImageFile(imageFile);
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
            }
            reader.readAsDataURL(imageFile);
        }
    }

    const capitalize = string => {
        const str = string.split(' ');
        const upperStr = str.map(string => {
            return string.substring(0, 1).toUpperCase() + string.substring(1, string.length).toLowerCase();
        });
        return upperStr.join(' ');
    }

    const searchUserByName = event => {
        setSearchUserName(event.target.value);
    }

    const addUser = () => {
        if (addUserName.current.value) {
            const newUser = users.concat({
                name: capitalize(addUserName.current.value),
                id: id,
                email: userEmail.current.value,
                phone: userPhone.current.value,
                image: uploadedImage,
            });
            setId(id + 1);
            setUsers(newUser);
            addUserName.current.value = '';
            userEmail.current.value = '';
            userPhone.current.value = '';
            userImageInput.current.value = '';
            localStorage.setItem('users', JSON.stringify(newUser));
        } else {
            const userAddInput = document.querySelector('#add-user');
            userAddInput.style.setProperty('--placeholder-color', 'red');
            userAddInput.placeholder = `User's name can't be empty: Input user name`;
            setTimeout(() => {
                userAddInput.style.setProperty('--placeholder-color', 'gray');
                userAddInput.placeholder = 'Name:';
            }, 2000);
        }
    }

    const removeUser = id => {
        const filteredUsers = users.filter(user => user.id !== id);
        const confirmRemoving = window.confirm(`Delete user? This action is not recoverable.`);
        if (confirmRemoving) {
            setUsers(filteredUsers);
            localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
    }

    const removeAll = () => {
        if (users.length === 0) {
            const userAddInput = document.querySelector(`#add-user`);
            userAddInput.style.setProperty('--placeholder-color', 'red');
            userAddInput.placeholder = `There's nothing to remove`;
            setTimeout(() => {
                userAddInput.style.setProperty('--placeholder-color', 'gray');
                userAddInput.placeholder = 'Name:';
            }, 2000);
        } else {
            const confirmRemoving = window.confirm(`Are You sure? This will permanently delete all users.`);
            if (confirmRemoving) {
                setUsers([]);
                localStorage.setItem('users', JSON.stringify([]));
            }
        }
    }

    const editUser = id => {

        const newName = capitalize(addUserName.current.value);
        const newEmail = userEmail.current.value;
        const newPhone = userPhone.current.value;
        const newImage = userImageInput.current.files[0];

        const confirmEditing = window.confirm(`Save Changes?`);

        if (confirmEditing) {

            const editedUsers = users.map(user => {

                if (user.id === id) {

                    return {
                        name: newName === 'Del' ? '' : (newName !== '' ? newName : user.name),
                        email: newEmail === 'del' ? '' : (newEmail !== '' ? newEmail : user.email),
                        phone: newPhone === '0' ? '' : (newPhone !== '' ? newPhone : user.phone),
                        image: uploadedImage || user.image,
                        id: user.id,
                    };
                }
                return user;

            });

            setUsers(editedUsers);
            setUploadedImage(null);
            setImageFile(newImage);

            addUserName.current.value = '';
            userEmail.current.value = '';
            userPhone.current.value = '';
            userImageInput.current.value = '';
            localStorage.setItem('users', JSON.stringify(editedUsers));

        }
    };

    const removeImage = id => {
        const confirmRemoving = window.confirm(`Delete Image?`);
        if (confirmRemoving) {
            const updatedUser = users.map(user => {
                if (user.id === id) {
                    return { ...user, image: null };
                };
                return user;
            });
            setUsers(updatedUser);
            localStorage.setItem('users', JSON.stringify(updatedUser));
        };
    };

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            return addUser();
        }
    }

    const handleSelectUser = (userId) => {
        setSelectedUsers((selected_user) => {
            if (selected_user.includes(userId)) {
                return selected_user.filter((id) => id !== userId);
            } else {
                return [...selected_user, userId];
            }
        });
    };

    useEffect(() => {
        setDisableButton(selectedUsers.length === 0);
    }, [selectedUsers]);

    const deleteSelectedUsers = () => {
        const confirmRemoving = window.confirm(`delete selected users? This action is not recoverable.`);

        const filteredUsers = users.filter(user => !selectedUsers.includes(user.id));

        if (confirmRemoving) {
            setUsers(filteredUsers);
            localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
        setSelectedUsers([]);
    }

    return (
        <Fragment>

            <section className={classes['display']}>
                <h1 style={{ color: 'green', fontSize: '48px', fontWeight: '400', }}>
                    {
                        selectedUsers.length === 0 || users.length === 0 ? 'Contact List'
                            : `${selectedUsers.length}/${users.length} Selected`
                    }
                </h1>
                <input type='text' ref={addUserName} placeholder='name:' id='add-user' className={classes['add-user-input']} onKeyUp={keyPress} />
                <input type='email' ref={userEmail} placeholder='Email:' className='email-user-input' onKeyUp={keyPress} />
                <input type='number' ref={userPhone} placeholder='Phone:' className='phone-user-input' min='0' onKeyUp={keyPress} />
                <input type='file' accept='image/*' title='Upload image'
                    ref={userImageInput} className='user-image-input' onKeyUp={keyPress}
                    onChange={handleImageUpload}
                />
                <div className={classes['btns-div']}>
                    <button onClick={addUser} className={classes['add-user-btn']} title='Add User(Enter)'>
                        <BsPersonFillAdd style={{ width: '50px', height: '25px' }} />
                    </button>
                    <button onClick={removeAll} className={classes['remove-all-btn']} title='Remove all users'>
                        <BiTrash style={{ width: '50px', height: '25px' }} />
                    </button>
                    <button onClick={() => window.location.reload()} className={classes['reset-btn']} title='Reset Page'>
                        <BiReset style={{ width: '50px', height: '25px', }} />
                    </button>
                    <button onClick={deleteSelectedUsers} className={classes['remove-selected-users-btn']}
                        disabled={disableButton} title={disableButton ? 'Select users to enable this button' : 'Remove selected users'}
                    >
                        <AiOutlineUsergroupDelete style={{ width: '50px', height: '25px' }} />
                    </button>
                </div>
                <input onChange={searchUserByName} placeholder='search user by name' className='search-user-input' />
            </section>

            {
                users.length !== 0 ?
                    <section className={classes['parent-user-container']}>
                        {
                            users.filter(item => item.name.toLowerCase().includes(searchUserName.toLowerCase())).map((user, i) => (
                                <div key={user.id} className={classes['user-container']}>
                                    <div className={classes['content']}>

                                        {user.image ?
                                            <Fragment>
                                                <img src={user.image} alt={`User ${user.id}`}
                                                    className={classes['user-image']} draggable='false' />
                                            </Fragment> : null
                                        }

                                        {user.name ?
                                            <p title='Enter "Del" for delete name'>
                                                <AiOutlineUser style={{ color: 'white', backgroundColor: 'orangered', }}
                                                    title={`User: ${i + 1}/${users.length}`}
                                                    className={classes['icon']} />
                                                <span className='content-text'> {user.name} </span>
                                            </p> : null
                                        }

                                        {user.email ?
                                            <p title='Enter "del" for delete email '>
                                                <MdEmail className={classes['icon']} />
                                                <span className='content-text'> {user.email} </span>
                                            </p> : null
                                        }

                                        {user.phone ?
                                            <p title='Enter "0" for delete phone '>
                                                <AiOutlinePhone style={{ color: 'green', }} className={classes['icon']} />
                                                <span className='content-text'> {user.phone} </span>
                                            </p> : null
                                        }

                                    </div>

                                    <div className={classes['user-btns-div']}>
                                        <input type='checkbox'
                                            className={classes['check']}
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelectUser(user.id)}
                                            title='Select user'
                                        />
                                        <button onClick={() => removeUser(user.id)} className={classes['remove-user-btn']} title='Remove this user' >
                                            <HiOutlineUserRemove style={{ width: '50px', height: '25px' }} />
                                        </button>
                                        <button onClick={() => editUser(user.id)} className={classes['edit-user-btn']} title='Edit User' >
                                            <BiEditAlt style={{ width: '50px', height: '25px' }} />
                                        </button>
                                        {
                                            user.image ? <button onClick={() => removeImage(user.id)} className={classes['remove-image-btn']}
                                                title='Remove Image' >
                                                <CgRemove style={{ width: '50px', height: '25px' }} />
                                            </button> : null
                                        }
                                    </div>

                                </div>

                            ))
                        }
                    </section>
                    : <div className={classes['parent-user-container']}
                        style={{
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <h2 style={{
                            width: '100%', fontWeight: '300', color: 'green',
                            display: 'flex', justifyContent: 'center'
                        }}>
                            List is Empty: Add Contact now!
                        </h2>
                        <button onClick={addUser}
                            className={classes['add-user-btn']} title='Add User(Enter)'>
                            <BsPersonFillAdd style={{ width: '50px', height: '25px', }} />
                        </button>
                    </div>
            }

        </Fragment>
    )
}

export default Display;