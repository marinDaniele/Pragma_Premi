/**
 * Created by gmanzoli on 13/06/15.
 */
function LoginPage() {
	this.btnLogin = element(by.id('btn-login'));
}

LoginPage.prototype.login = function (user,password){
	element(by.model('user.email')).sendKeys(user);
	element(by.model('user.password')).sendKeys(password);
	this.btnLogin.click();
};

module.exports = LoginPage;
